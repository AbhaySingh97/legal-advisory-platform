from fastapi import APIRouter, Depends, HTTPException
from typing import List

from app.core.database import get_db, Database
from app.schemas import ChatMessage, ChatResponse, QuickReplyResponse
from app.services.chat_service import ChatService
from app.models import QuickReply

router = APIRouter(prefix="/chat", tags=["chat"])


@router.post("", response_model=ChatResponse)
async def chat(
    message: ChatMessage,
    db: Database = Depends(get_db)
):
    """
    Process a chat message and return a response.
    """
    try:
        # ChatService now uses synchronous filtering on in-memory data
        chat_service = ChatService(db)
        result = chat_service.process_chat_message(message.message)
        
        return ChatResponse(
            success=result['success'],
            message=result['message'],
            related_articles=result.get('related_articles')
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"An error occurred: {str(e)}")


@router.get("/quick-replies", response_model=List[QuickReplyResponse])
async def get_quick_replies(db: Database = Depends(get_db)):
    """
    Get quick reply suggestions.
    """
    # Sort JSON list by order field
    quick_replies = sorted(db.quick_replies, key=lambda x: x.get("order", 0))
    return quick_replies
