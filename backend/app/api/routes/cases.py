from fastapi import APIRouter, Depends, Query, HTTPException
from typing import List, Optional

from app.core.database import get_db, Database
from app.schemas import LandmarkCaseResponse
from app.models import LandmarkCase

router = APIRouter(prefix="/cases", tags=["cases"])


@router.get("", response_model=List[LandmarkCaseResponse])
async def get_cases(
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=100),
    year: Optional[int] = None,
    search: Optional[str] = None,
    db: Database = Depends(get_db)
):
    """
    Get all landmark cases with optional filtering and pagination.
    """
    all_cases = db.cases
    
    # 1. Filter by year
    if year:
        all_cases = [c for c in all_cases if c.get("year") == year]
    
    # 2. Search by keyword in name or significance
    if search:
        search_lower = search.lower()
        all_cases = [
            c for c in all_cases 
            if search_lower in c.get("name", "").lower() or 
               search_lower in c.get("significance", "").lower()
        ]
    
    # 3. Apply Pagination
    start = skip
    end = skip + limit
    paginated_cases = all_cases[start:end]
    
    return paginated_cases


@router.get("/{case_id}", response_model=LandmarkCaseResponse)
async def get_case(
    case_id: str,
    db: Database = Depends(get_db)
):
    """
    Get a specific landmark case by ID.
    Using ID from JSON (integer or string)
    """
    # Try to match by ID
    case = next((c for c in db.cases if str(c.get("id")) == str(case_id)), None)
    
    if not case:
        raise HTTPException(status_code=404, detail="Case not found")
    return case
