from fastapi import APIRouter, Depends, Query, HTTPException
from motor.motor_asyncio import AsyncIOMotorDatabase
from typing import List, Optional

from app.core.database import get_db
from app.schemas import ArticleResponse
from app.models import Article

router = APIRouter(prefix="/articles", tags=["articles"])


@router.get("", response_model=List[ArticleResponse])
async def get_articles(
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=100),
    category: Optional[str] = None,
    search: Optional[str] = None,
    db: AsyncIOMotorDatabase = Depends(get_db)
):
    """
    Get all articles with optional filtering and pagination.
    """
    query = {}
    
    # Filter by category
    if category:
        query["category"] = category
    
    # Search by keyword in title or description
    if search:
        query["$or"] = [
            {"title": {"$regex": search, "$options": "i"}},
            {"description": {"$regex": search, "$options": "i"}}
        ]
    
    cursor = db.articles.find(query).skip(skip).limit(limit)
    articles = await cursor.to_list(length=limit)
    return articles


@router.get("/{article_number}", response_model=ArticleResponse)
async def get_article(
    article_number: str,
    db: AsyncIOMotorDatabase = Depends(get_db)
):
    """
    Get a specific article by number.
    """
    article = await db.articles.find_one({"number": article_number})
    
    if not article:
        raise HTTPException(status_code=404, detail="Article not found")
    return article


@router.get("/categories/list", response_model=List[str])
async def get_categories(db: AsyncIOMotorDatabase = Depends(get_db)):
    """
    Get all unique article categories.
    """
    categories = await db.articles.distinct("category")
    return categories
