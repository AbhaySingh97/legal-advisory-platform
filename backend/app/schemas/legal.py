from pydantic import BaseModel, Field
from typing import List, Optional


# Article Schemas
class ArticleBase(BaseModel):
    """Base Article schema."""
    number: str
    title: str
    description: str
    category: str
    keywords: List[str]


class ArticleCreate(ArticleBase):
    """Schema for creating an article."""
    pass


class ArticleResponse(ArticleBase):
    """Schema for article response."""
    id: int
    
    class Config:
        from_attributes = True


# Landmark Case Schemas
class LandmarkCaseBase(BaseModel):
    """Base Landmark Case schema."""
    name: str
    year: int
    significance: str
    key_points: List[str]
    keywords: List[str]


class LandmarkCaseCreate(LandmarkCaseBase):
    """Schema for creating a landmark case."""
    pass


class LandmarkCaseResponse(LandmarkCaseBase):
    """Schema for landmark case response."""
    id: int
    
    class Config:
        from_attributes = True


# Procedure Schemas
class ProcedureBase(BaseModel):
    """Base Procedure schema."""
    name: str
    description: str
    procedure: str
    keywords: List[str]


class ProcedureCreate(ProcedureBase):
    """Schema for creating a procedure."""
    pass


class ProcedureResponse(ProcedureBase):
    """Schema for procedure response."""
    id: int
    
    class Config:
        from_attributes = True


# Quick Reply Schemas
class QuickReplyBase(BaseModel):
    """Base Quick Reply schema."""
    text: str
    category: Optional[str] = None
    order: int = 0


class QuickReplyCreate(QuickReplyBase):
    """Schema for creating a quick reply."""
    pass


class QuickReplyResponse(QuickReplyBase):
    """Schema for quick reply response."""
    id: int
    
    class Config:
        from_attributes = True


# Chat Schemas
class ChatMessage(BaseModel):
    """Schema for chat message."""
    message: str = Field(..., min_length=1, max_length=1000)


class ChatResponse(BaseModel):
    """Schema for chat response."""
    success: bool
    message: str
    related_articles: Optional[List[ArticleResponse]] = None
