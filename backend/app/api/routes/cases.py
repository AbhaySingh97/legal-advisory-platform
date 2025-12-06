from fastapi import APIRouter, Depends, Query, HTTPException
from motor.motor_asyncio import AsyncIOMotorDatabase
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
    db: AsyncIOMotorDatabase = Depends(get_db)
):
    """
    Get all landmark cases with optional filtering and pagination.
    """
    query = {}
    
    # Filter by year
    if year:
        query["year"] = year
    
    # Search by keyword in name or significance
    if search:
        query["$or"] = [
            {"name": {"$regex": search, "$options": "i"}},
            {"significance": {"$regex": search, "$options": "i"}}
        ]
    
    cursor = db.landmark_cases.find(query).skip(skip).limit(limit)
    cases = await cursor.to_list(length=limit)
    return cases


@router.get("/{case_id}", response_model=LandmarkCaseResponse)
async def get_case(
    case_id: str,
    db: AsyncIOMotorDatabase = Depends(get_db)
):
    """
    Get a specific landmark case by ID.
    NOTE: ID is now a string (ObjectId).
    """
    from bson import ObjectId
    try:
        oid = ObjectId(case_id)
    except:
        raise HTTPException(status_code=400, detail="Invalid ID format")

    case = await db.landmark_cases.find_one({"_id": oid})
    
    if not case:
        raise HTTPException(status_code=404, detail="Case not found")
    return case
