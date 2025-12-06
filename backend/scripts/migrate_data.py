import json
import os
import sys

# Append the backend directory to sys.path to allow imports from app
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))

from pymongo import MongoClient
import certifi
from app.core.config import settings

def load_data(file_path: str):
    """Load JSON data from file."""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            return json.load(f)
    except FileNotFoundError:
        print(f"Error: File not found at {file_path}")
        sys.exit(1)
    except json.JSONDecodeError:
        print(f"Error: Invalid JSON format in {file_path}")
        sys.exit(1)

def migrate_data(clear_existing: bool = False):
    """Migrate data from JSON to MongoDB using Synchronous MongoClient."""
    
    # 1. Configuration & Connection
    # Using tlsAllowInvalidCertificates=True to bypass Render/Atlas SSL handshake issues
    # Using synchronous MongoClient for stability in build scripts
    print(f"Connecting to MongoDB: {settings.DATABASE_URL}...")
    
    try:
        client = MongoClient(
            settings.DATABASE_URL,
            tlsCAFile=certifi.where(),
            tlsAllowInvalidCertificates=True  # STRICTLY bypassing the SSL error
        )
        # Verify connection
        client.admin.command('ping')
        print("Successfully connected to MongoDB.")
    except Exception as e:
        print(f"Failed to connect to MongoDB: {e}")
        sys.exit(1)

    db = client[settings.DATABASE_NAME]

    # 2. Load Data
    data_file = os.path.join(os.path.dirname(__file__), '..', 'data', 'constitution_data.json')
    data = load_data(data_file)
    
    articles = data.get('articles', [])
    cases = data.get('landmark_cases', [])
    procedures = data.get('procedures', [])
    quick_replies = data.get('quick_replies', [])

    # 3. Clear Existing Data (Optional)
    if clear_existing:
        print("Clearing existing data...")
        db.articles.delete_many({})
        db.landmark_cases.delete_many({})
        db.procedures.delete_many({})
        db.quick_replies.delete_many({})
        print("Existing data cleared.")

    # 4. Insert New Data
    print(f"Migrating {len(articles)} articles...")
    if articles:
        db.articles.insert_many(articles)
    
    print(f"Migrating {len(cases)} landmark cases...")
    if cases:
        db.landmark_cases.insert_many(cases)
        
    print(f"Migrating {len(procedures)} procedures...")
    if procedures:
        db.procedures.insert_many(procedures)

    print(f"Migrating {len(quick_replies)} quick replies...")
    if quick_replies:
        db.quick_replies.insert_many(quick_replies)

    # 5. Cleanup
    client.close()
    
    print("\nMigration completed successfully!")
    print(f"   - Articles: {len(articles)}")
    print(f"   - Landmark Cases: {len(cases)}")
    print(f"   - Procedures: {len(procedures)}")
    print(f"   - Quick Replies: {len(quick_replies)}")

if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser(description="Migrate data to MongoDB")
    parser.add_argument("--clear", action="store_true", help="Clear existing data before migration")
    args = parser.parse_args()
    
    migrate_data(clear_existing=args.clear)
