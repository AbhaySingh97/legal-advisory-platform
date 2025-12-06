from pydantic import BaseModel, Field, BeforeValidator
from typing import Optional, List, Annotated

# Helper for ObjectId
PyObjectId = Annotated[str, BeforeValidator(str)]

class MongoBaseModel(BaseModel):
    id: Optional[PyObjectId] = Field(alias="_id", default=None)

    class Config:
        populate_by_name = True
        arbitrary_types_allowed = True
        json_encoders = {
            # This might be needed if using ObjectId directly, 
            # but with BeforeValidator(str) we are safe
        }

class Article(MongoBaseModel):
    """Constitution Article model."""
    number: str
    title: str
    description: str
    category: str
    keywords: List[str]

class LandmarkCase(MongoBaseModel):
    """Landmark Case model."""
    name: str
    year: int
    significance: str
    detailed_explanation: Optional[str] = None
    key_points: List[str]
    keywords: List[str]

class Procedure(MongoBaseModel):
    """Legal Procedure model."""
    name: str
    description: str
    procedure: str
    keywords: List[str]

class QuickReply(MongoBaseModel):
    """Quick Reply suggestions model."""
    text: str
    category: Optional[str] = "General"
    order: int = 0
