"""
Data migration script to load constitution data into SQLite database.
"""
import json
import os
import sys
from pathlib import Path

# Add parent directory to path
sys.path.insert(0, str(Path(__file__).parent.parent))

from sqlalchemy import create_engine, Column, Integer, String, Text, JSON
from sqlalchemy.orm import sessionmaker, declarative_base

# Create Base here to avoid async engine issues
Base = declarative_base()

# Define models directly here for migration
class Article(Base):
    __tablename__ = "articles"
    id = Column(Integer, primary_key=True, index=True)
    number = Column(String(10), unique=True, index=True, nullable=False)
    title = Column(String(500), nullable=False)
    description = Column(Text, nullable=False)
    category = Column(String(200), index=True, nullable=False)
    keywords = Column(JSON, nullable=False)

class LandmarkCase(Base):
    __tablename__ = "landmark_cases"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(500), nullable=False)
    year = Column(Integer, index=True, nullable=False)
    significance = Column(Text, nullable=False)
    key_points = Column(JSON, nullable=False)
    keywords = Column(JSON, nullable=False)

class Procedure(Base):
    __tablename__ = "procedures"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(500), nullable=False)
    description = Column(Text, nullable=False)
    procedure = Column(Text, nullable=False)
    keywords = Column(JSON, nullable=False)

class QuickReply(Base):
    __tablename__ = "quick_replies"
    id = Column(Integer, primary_key=True, index=True)
    text = Column(String(500), nullable=False)
    category = Column(String(100))
    order = Column(Integer, default=0)


def load_json_data():
    """Load data from JSON file."""
    data_file = Path(__file__).parent.parent / "data" / "constitution_data.json"
    with open(data_file, 'r', encoding='utf-8') as f:
        return json.load(f)


def migrate_data(clear_existing=False):
    """Migrate data from JSON to SQLite database."""
    
    # Create synchronous engine for migration
    engine = create_engine("sqlite:///./legal_db.sqlite", echo=True)
    
    # Create tables
    print("Creating database tables...")
    Base.metadata.create_all(engine)
    
    # Create session
    SessionLocal = sessionmaker(bind=engine)
    db = SessionLocal()
    
    try:
        # Clear existing data if requested
        if clear_existing:
            print("Clearing existing data...")
            db.query(QuickReply).delete()
            db.query(Procedure).delete()
            db.query(LandmarkCase).delete()
            db.query(Article).delete()
            db.commit()
        
        # Load JSON data
        print("Loading JSON data...")
        data = load_json_data()
        
        # Migrate Articles
        print(f"Migrating {len(data['articles'])} articles...")
        for article_data in data['articles']:
            article = Article(
                number=article_data['number'],
                title=article_data['title'],
                description=article_data['description'],
                category=article_data['category'],
                keywords=article_data['keywords']
            )
            db.add(article)
        
        # Migrate Landmark Cases
        if 'landmark_cases' in data:
            print(f"Migrating {len(data['landmark_cases'])} landmark cases...")
            for case_data in data['landmark_cases']:
                case = LandmarkCase(
                    name=case_data['name'],
                    year=case_data['year'],
                    significance=case_data['significance'],
                    key_points=case_data['key_points'],
                    keywords=case_data['keywords']
                )
                db.add(case)
        
        # Migrate Procedures
        if 'procedures' in data:
            print(f"Migrating {len(data['procedures'])} procedures...")
            for proc_data in data['procedures']:
                procedure = Procedure(
                    name=proc_data['name'],
                    description=proc_data['description'],
                    procedure=proc_data['procedure'],
                    keywords=proc_data['keywords']
                )
                db.add(procedure)
        
        # Migrate Quick Replies
        if 'quick_replies' in data:
            print(f"Migrating {len(data['quick_replies'])} quick replies...")
            for idx, reply_text in enumerate(data['quick_replies']):
                quick_reply = QuickReply(
                    text=reply_text,  # reply_text is already a string
                    category="General",
                    order=idx
                )
                db.add(quick_reply)
        
        # Commit all changes
        print("Committing changes...")
        db.commit()
        
        print("\nMigration completed successfully!")
        print(f"   - Articles: {db.query(Article).count()}")
        print(f"   - Landmark Cases: {db.query(LandmarkCase).count()}")
        print(f"   - Procedures: {db.query(Procedure).count()}")
        print(f"   - Quick Replies: {db.query(QuickReply).count()}")
        
    except Exception as e:
        print(f"\nError during migration: {e}")
        db.rollback()
        raise
    finally:
        db.close()


if __name__ == "__main__":
    import argparse
    
    parser = argparse.ArgumentParser(description="Migrate constitution data to database")
    parser.add_argument("--clear", action="store_true", help="Clear existing data before migration")
    args = parser.parse_args()
    
    migrate_data(clear_existing=args.clear)
