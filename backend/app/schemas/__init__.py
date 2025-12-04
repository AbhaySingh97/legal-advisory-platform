# Schemas module
from app.schemas.legal import (
    ArticleBase, ArticleCreate, ArticleResponse,
    LandmarkCaseBase, LandmarkCaseCreate, LandmarkCaseResponse,
    ProcedureBase, ProcedureCreate, ProcedureResponse,
    QuickReplyBase, QuickReplyCreate, QuickReplyResponse,
    ChatMessage, ChatResponse
)

__all__ = [
    "ArticleBase", "ArticleCreate", "ArticleResponse",
    "LandmarkCaseBase", "LandmarkCaseCreate", "LandmarkCaseResponse",
    "ProcedureBase", "ProcedureCreate", "ProcedureResponse",
    "QuickReplyBase", "QuickReplyCreate", "QuickReplyResponse",
    "ChatMessage", "ChatResponse"
]
