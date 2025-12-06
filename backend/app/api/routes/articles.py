from fastapi import APIRouter, Depends, Query, HTTPException
from typing import List, Optional

from app.core.database import get_db, Database
from app.schemas import ArticleResponse
from app.models import Article

router = APIRouter(prefix="/articles", tags=["articles"])


@router.get("", response_model=List[ArticleResponse])
async def get_articles(
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=100),
    category: Optional[str] = None,
    search: Optional[str] = None,
    db: Database = Depends(get_db)
):
    """
    Get all articles with optional filtering and pagination.
    """
    all_articles = db.articles
    
    # 1. Filter by category
    if category:
        all_articles = [a for a in all_articles if a.get("category") == category]
    
    # 2. Search by keyword in title or description
    if search:
        search_lower = search.lower()
        all_articles = [
            a for a in all_articles 
            if search_lower in a.get("title", "").lower() or 
               search_lower in a.get("description", "").lower()
        ]
    
    # 3. Apply Pagination
    start = skip
    end = skip + limit
    paginated_articles = all_articles[start:end]
    
    return paginated_articles


@router.get("/{article_number}", response_model=ArticleResponse)
async def get_article(
    article_number: str,
    db: Database = Depends(get_db)
):
    """
    Get a specific article by number.
    """
    # Case insensitive match for article number (e.g. 21A vs 21a)
    article = next(
        (a for a in db.articles if a.get("number", "").lower() == article_number.lower()), 
        None
    )
    
    if not article:
        # Try finding by ID if number fails (fallback for some clients)
        try:
            # Not needed for JSON but good for compatibility if ID passed
            pass
        except:
            pass
            
        raise HTTPException(status_code=404, detail="Article not found")
        
    return article


@router.get("/categories/list", response_model=List[str])
async def get_categories(db: Database = Depends(get_db)):
    """
    Get all unique article categories.
    """
    # Get unique categories
    categories = sorted(list(set(a.get("category") for a in db.articles if a.get("category"))))
    return categories
