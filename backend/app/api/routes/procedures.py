from fastapi import APIRouter, Depends, Query, HTTPException
from motor.motor_asyncio import AsyncIOMotorDatabase
from typing import List, Optional

from app.core.database import get_db
from app.schemas import ProcedureResponse
from app.models import Procedure

router = APIRouter(prefix="/procedures", tags=["procedures"])


@router.get("", response_model=List[ProcedureResponse])
async def get_procedures(
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=100),
    search: Optional[str] = None,
    db: AsyncIOMotorDatabase = Depends(get_db)
):
    """
    Get all legal procedures with optional filtering and pagination.
    """
    query = {}
    
    # Search by keyword in name or description
    if search:
        query["$or"] = [
            {"name": {"$regex": search, "$options": "i"}},
            {"description": {"$regex": search, "$options": "i"}}
        ]
    
    cursor = db.procedures.find(query).skip(skip).limit(limit)
    procedures = await cursor.to_list(length=limit)
    return procedures


@router.get("/{procedure_id}", response_model=ProcedureResponse)
async def get_procedure(
    procedure_id: str,
    db: AsyncIOMotorDatabase = Depends(get_db)
):
    """
    Get a specific legal procedure by ID.
    NOTE: ID is now a string (ObjectId).
    """
    from bson import ObjectId
    try:
        oid = ObjectId(procedure_id)
    except:
        raise HTTPException(status_code=400, detail="Invalid ID format")

    procedure = await db.procedures.find_one({"_id": oid})
    
    if not procedure:
        raise HTTPException(status_code=404, detail="Procedure not found")
    return procedure
