"""
Data migration script to load constitution data into MongoDB.
"""
import json
import sys
import asyncio
from pathlib import Path
from motor.motor_asyncio import AsyncIOMotorClient

# Add parent directory to path
sys.path.insert(0, str(Path(__file__).parent.parent))

from app.core.config import settings
from app.models.legal import Article, LandmarkCase, Procedure, QuickReply

def load_json_data():
    """Load data from JSON file."""
    data_file = Path(__file__).parent.parent / "data" / "constitution_data.json"
    with open(data_file, 'r', encoding='utf-8') as f:
        return json.load(f)

async def migrate_data(clear_existing=False):
    """Migrate data from JSON to MongoDB."""
    
    print(f"Connecting to MongoDB: {settings.DATABASE_URL}")
    client = AsyncIOMotorClient(settings.DATABASE_URL)
    db = client[settings.DATABASE_NAME]
    
    try:
        # Load JSON data
        print("Loading JSON data...")
        data = load_json_data()
        
        # Collections
        articles_coll = db.articles
        cases_coll = db.landmark_cases
        procedures_coll = db.procedures
        quick_replies_coll = db.quick_replies
        
        # Clear existing data if requested
        if clear_existing:
            print("Clearing existing data...")
            await articles_coll.delete_many({})
            await cases_coll.delete_many({})
            await procedures_coll.delete_many({})
            await quick_replies_coll.delete_many({})
        
        # Migrate Articles
        if 'articles' in data:
            print(f"Migrating {len(data['articles'])} articles...")
            articles = []
            for item in data['articles']:
                # validate with model
                article = Article(**item)
                # dump to dict, exclude id so mongo generates it
                articles.append(article.model_dump(by_alias=True, exclude={"id"}))
            
            if articles:
                await articles_coll.insert_many(articles)
        
        # Migrate Landmark Cases
        if 'landmark_cases' in data:
            print(f"Migrating {len(data['landmark_cases'])} landmark cases...")
            cases = []
            for item in data['landmark_cases']:
                # Convert year to int if string (as in original script)
                if isinstance(item.get('year'), str):
                     item['year'] = int(item['year'])
                
                case = LandmarkCase(**item)
                cases.append(case.model_dump(by_alias=True, exclude={"id"}))
            
            if cases:
                await cases_coll.insert_many(cases)
        
        # Migrate Procedures
        if 'procedures' in data:
            print(f"Migrating {len(data['procedures'])} procedures...")
            procedures = []
            for item in data['procedures']:
                proc = Procedure(**item)
                procedures.append(proc.model_dump(by_alias=True, exclude={"id"}))
            
            if procedures:
                await procedures_coll.insert_many(procedures)
        
        # Migrate Quick Replies
        if 'quick_replies' in data:
            print(f"Migrating {len(data['quick_replies'])} quick replies...")
            replies = []
            for idx, reply_text in enumerate(data['quick_replies']):
                reply = QuickReply(
                    text=reply_text,
                    category="General",
                    order=idx
                )
                replies.append(reply.model_dump(by_alias=True, exclude={"id"}))
            
            if replies:
                await quick_replies_coll.insert_many(replies)
        
        print("\nMigration completed successfully!")
        print(f"   - Articles: {await articles_coll.count_documents({})}")
        print(f"   - Landmark Cases: {await cases_coll.count_documents({})}")
        print(f"   - Procedures: {await procedures_coll.count_documents({})}")
        print(f"   - Quick Replies: {await quick_replies_coll.count_documents({})}")
        
    except Exception as e:
        print(f"\nError during migration: {e}")
        raise
    finally:
        client.close()

if __name__ == "__main__":
    import argparse
    
    parser = argparse.ArgumentParser(description="Migrate constitution data to MongoDB")
    parser.add_argument("--clear", action="store_true", help="Clear existing data before migration")
    args = parser.parse_args()
    
    asyncio.run(migrate_data(clear_existing=args.clear))
