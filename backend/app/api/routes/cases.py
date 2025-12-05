from fastapi import APIRouter, Depends, Query, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import or_
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
    db: AsyncSession = Depends(get_db)
):
    """
    Get all landmark cases with optional filtering and pagination.
    """
    query = select(LandmarkCase)
    
    # Filter by year
    if year:
        query = query.filter(LandmarkCase.year == year)
    
    # Search by keyword in name or significance
    if search:
        search_term = f"%{search}%"
        query = query.filter(
            or_(
                LandmarkCase.name.ilike(search_term),
                LandmarkCase.significance.ilike(search_term)
            )
        )
    
    query = query.offset(skip).limit(limit)
    result = await db.execute(query)
    cases = result.scalars().all()
    return cases


@router.get("/{case_id}", response_model=LandmarkCaseResponse)
async def get_case(
    case_id: int,
    db: AsyncSession = Depends(get_db)
):
    """
    Get a specific landmark case by ID.
    """
    result = await db.execute(select(LandmarkCase).filter(LandmarkCase.id == case_id))
    case = result.scalars().first()
    
    if not case:
        raise HTTPException(status_code=404, detail="Case not found")
    return case
