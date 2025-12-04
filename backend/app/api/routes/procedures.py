from fastapi import APIRouter, Depends, Query, HTTPException
from sqlalchemy.orm import Session
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
    db: Session = Depends(get_db)
):
    """
    Get all legal procedures with optional filtering and pagination.
    """
    query = db.query(Procedure)
    
    # Search by keyword in name or description
    if search:
        search_term = f"%{search}%"
        query = query.filter(
            (Procedure.name.ilike(search_term)) |
            (Procedure.description.ilike(search_term))
        )
    
    procedures = query.offset(skip).limit(limit).all()
    return procedures


@router.get("/{procedure_id}", response_model=ProcedureResponse)
async def get_procedure(
    procedure_id: int,
    db: Session = Depends(get_db)
):
    """
    Get a specific legal procedure by ID.
    """
    procedure = db.query(Procedure).filter(Procedure.id == procedure_id).first()
    if not procedure:
        raise HTTPException(status_code=404, detail="Procedure not found")
    return procedure
