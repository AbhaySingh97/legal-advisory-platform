from motor.motor_asyncio import AsyncIOMotorClient
from app.core.config import settings
import certifi

class Database:
    client: AsyncIOMotorClient = None

db = Database()

async def get_db():
    """Dependency that returns the database instance."""
    return db.client[settings.DATABASE_NAME]
