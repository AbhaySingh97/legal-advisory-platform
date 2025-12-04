from fastapi import APIRouter, Depends, Query, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import or_
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
    db: AsyncSession = Depends(get_db)
):
    """
    Get all articles with optional filtering and pagination.
    """
    query = select(Article)
    
    # Filter by category
    if category:
        query = query.filter(Article.category == category)
    
    # Search by keyword in title or description
    if search:
        search_term = f"%{search}%"
        query = query.filter(
            or_(Article.title.ilike(search_term), Article.description.ilike(search_term))
        )
    
    query = query.offset(skip).limit(limit)
    result = await db.execute(query)
    articles = result.scalars().all()
    return articles


@router.get("/{article_number}", response_model=ArticleResponse)
async def get_article(
    article_number: str,
    db: AsyncSession = Depends(get_db)
):
    """
    Get a specific article by number.
    """
    result = await db.execute(select(Article).filter(Article.number == article_number))
    article = result.scalars().first()
    
    if not article:
        raise HTTPException(status_code=404, detail="Article not found")
    return article


@router.get("/categories/list", response_model=List[str])
async def get_categories(db: AsyncSession = Depends(get_db)):
    """
    Get all unique article categories.
    """
    result = await db.execute(select(Article.category).distinct())
    categories = result.scalars().all()
    return categories
