from fastapi import APIRouter, Depends, Query, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional

from app.core.database import get_db
from app.schemas import LandmarkCaseResponse
from app.models import LandmarkCase

router = APIRouter(prefix="/cases", tags=["cases"])


@router.get("", response_model=List[LandmarkCaseResponse])
async def get_cases(
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=100),
    year: Optional[int] = None,
    search: Optional[str] = None,
    db: Session = Depends(get_db)
):
    """
    Get all landmark cases with optional filtering and pagination.
    """
    query = db.query(LandmarkCase)
    
    # Filter by year
    if year:
        query = query.filter(LandmarkCase.year == year)
    
    # Search by keyword in name or significance
    if search:
        search_term = f"%{search}%"
        query = query.filter(
            (LandmarkCase.name.ilike(search_term)) |
            (LandmarkCase.significance.ilike(search_term))
        )
    
    cases = query.offset(skip).limit(limit).all()
    return cases


@router.get("/{case_id}", response_model=LandmarkCaseResponse)
async def get_case(
    case_id: int,
    db: Session = Depends(get_db)
):
    """
    Get a specific landmark case by ID.
    """
    case = db.query(LandmarkCase).filter(LandmarkCase.id == case_id).first()
    if not case:
        raise HTTPException(status_code=404, detail="Case not found")
    return case
