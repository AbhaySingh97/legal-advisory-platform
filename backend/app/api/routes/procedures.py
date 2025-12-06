from fastapi import APIRouter, Depends, Query, HTTPException
from typing import List, Optional

from app.core.database import get_db, Database
from app.schemas import ProcedureResponse
from app.models import Procedure

router = APIRouter(prefix="/procedures", tags=["procedures"])


@router.get("", response_model=List[ProcedureResponse])
async def get_procedures(
    skip: int = Query(0, ge=0),
    limit: int = Query(50, ge=1, le=100),
    search: Optional[str] = None,
    db: Database = Depends(get_db)
):
    """
    Get all legal procedures with optional filtering and pagination.
    """
    all_procedures = db.procedures
    
    # 1. Search by keyword in name or description
    if search:
        search_lower = search.lower()
        all_procedures = [
            p for p in all_procedures 
            if search_lower in p.get("name", "").lower() or 
               search_lower in p.get("description", "").lower()
        ]
    
    # 2. Apply Pagination
    start = skip
    end = skip + limit
    paginated_procedures = all_procedures[start:end]
    
    return paginated_procedures


@router.get("/{procedure_id}", response_model=ProcedureResponse)
async def get_procedure(
    procedure_id: str,
    db: Database = Depends(get_db)
):
    """
    Get a specific legal procedure by ID.
    """
    procedure = next((p for p in db.procedures if str(p.get("id")) == str(procedure_id)), None)
    
    if not procedure:
        raise HTTPException(status_code=404, detail="Procedure not found")
    return procedure
