from fastapi import APIRouter, Depends, Query, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from sqlalchemy import or_
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
    db: AsyncSession = Depends(get_db)
):
    """
    Get all legal procedures with optional filtering and pagination.
    """
    query = select(Procedure)
    
    # Search by keyword in name or description
    if search:
        search_term = f"%{search}%"
        query = query.filter(
            or_(
                Procedure.name.ilike(search_term),
                Procedure.description.ilike(search_term)
            )
        )
    
    query = query.offset(skip).limit(limit)
    result = await db.execute(query)
    procedures = result.scalars().all()
    return procedures


@router.get("/{procedure_id}", response_model=ProcedureResponse)
async def get_procedure(
    procedure_id: int,
    db: AsyncSession = Depends(get_db)
):
    """
    Get a specific legal procedure by ID.
    """
    result = await db.execute(select(Procedure).filter(Procedure.id == procedure_id))
    procedure = result.scalars().first()
    
    if not procedure:
        raise HTTPException(status_code=404, detail="Procedure not found")
    return procedure
