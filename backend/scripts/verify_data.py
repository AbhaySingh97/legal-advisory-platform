import asyncio
import os
from motor.motor_asyncio import AsyncIOMotorClient

async def verify_data():
    # Use the remote URL (User set this in env manually in terminal earlier, 
    # but we should probably request it or assume it's set in the session? 
    # I'll rely on the user having set it or pass it in command)
    db_url = os.getenv("DATABASE_URL")
    if not db_url:
        print("Error: DATABASE_URL not set.")
        return

    print(f"Connecting to... {db_url.split('@')[-1]}") # Hide credentials
    import certifi
    client = AsyncIOMotorClient(db_url, tlsCAFile=certifi.where())
    # db = client.get_default_database() # This fails if no DB in string
    db = client["legal_advisory_db"] # Force DB name
    
    print("\n--- Data Verification ---")
    print(f"Articles: {await db.articles.count_documents({})}")
    print(f"Cases: {await db.landmark_cases.count_documents({})}")
    print(f"Procedures: {await db.procedures.count_documents({})}")
    print(f"Quick Replies: {await db.quick_replies.count_documents({})}")
    print("-------------------------\n")
    client.close()

if __name__ == "__main__":
    asyncio.run(verify_data())
