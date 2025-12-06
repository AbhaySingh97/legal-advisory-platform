from pydantic import BaseModel, Field, BeforeValidator, ConfigDict
from typing import List, Optional, Annotated

# Helper for ObjectId
PyObjectId = Annotated[str, BeforeValidator(str)]

class MongoBaseModel(BaseModel):
    id: Optional[PyObjectId] = Field(alias="_id", default=None)
    
    model_config = ConfigDict(
        populate_by_name=True,
        arbitrary_types_allowed=True,
    )

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

class ArticleResponse(ArticleBase, MongoBaseModel):
    """Schema for article response."""
    pass


# Landmark Case Schemas
class LandmarkCaseBase(BaseModel):
    """Base Landmark Case schema."""
    name: str
    year: int
    significance: str
    detailed_explanation: Optional[str] = None
    key_points: List[str]
    keywords: List[str]

class LandmarkCaseCreate(LandmarkCaseBase):
    """Schema for creating a landmark case."""
    pass

class LandmarkCaseResponse(LandmarkCaseBase, MongoBaseModel):
    """Schema for landmark case response."""
    pass


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

class ProcedureResponse(ProcedureBase, MongoBaseModel):
    """Schema for procedure response."""
    pass


# Quick Reply Schemas
class QuickReplyBase(BaseModel):
    """Base Quick Reply schema."""
    text: str
    category: Optional[str] = "General"
    order: int = 0

class QuickReplyCreate(QuickReplyBase):
    """Schema for creating a quick reply."""
    pass

class QuickReplyResponse(QuickReplyBase, MongoBaseModel):
    """Schema for quick reply response."""
    pass


# Chat Schemas
class ChatMessage(BaseModel):
    """Schema for chat message."""
    message: str = Field(..., min_length=1, max_length=1000)

class ChatResponse(BaseModel):
    """Schema for chat response."""
    success: bool
    message: str
    related_articles: Optional[List[ArticleResponse]] = None
