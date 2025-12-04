from sqlalchemy import Column, Integer, String, Text, JSON
from app.core.database import Base


class Article(Base):
    """Constitution Article model."""
    
    __tablename__ = "articles"
    
    id = Column(Integer, primary_key=True, index=True)
    number = Column(String(10), unique=True, index=True, nullable=False)
    title = Column(String(500), nullable=False)
    description = Column(Text, nullable=False)
    category = Column(String(200), index=True, nullable=False)
    keywords = Column(JSON, nullable=False)  # List of keywords
    
    def __repr__(self):
        return f"<Article {self.number}: {self.title}>"


class LandmarkCase(Base):
    """Landmark Case model."""
    
    __tablename__ = "landmark_cases"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(500), nullable=False, index=True)
    year = Column(Integer, nullable=False, index=True)
    significance = Column(Text, nullable=False)
    key_points = Column(JSON, nullable=False)  # List of key points
    keywords = Column(JSON, nullable=False)  # List of keywords
    
    def __repr__(self):
        return f"<LandmarkCase {self.name} ({self.year})>"


class Procedure(Base):
    """Legal Procedure model."""
    
    __tablename__ = "procedures"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(500), nullable=False, index=True)
    description = Column(Text, nullable=False)
    procedure = Column(Text, nullable=False)  # Step-by-step procedure
    keywords = Column(JSON, nullable=False)  # List of keywords
    
    def __repr__(self):
        return f"<Procedure {self.name}>"


class QuickReply(Base):
    """Quick Reply suggestions model."""
    
    __tablename__ = "quick_replies"
    
    id = Column(Integer, primary_key=True, index=True)
    text = Column(String(500), nullable=False)
    category = Column(String(100), index=True)
    order = Column(Integer, default=0)
    
    def __repr__(self):
        return f"<QuickReply {self.text}>"
