from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.router import api_router

from contextlib import asynccontextmanager
from motor.motor_asyncio import AsyncIOMotorClient
from app.core.database import db

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Connect to MongoDB
    import certifi
    # Using tlsAllowInvalidCertificates=True to match the migration script stability
    db.client = AsyncIOMotorClient(
        settings.DATABASE_URL, 
        tlsCAFile=certifi.where(),
        tlsAllowInvalidCertificates=True
    )
    print(f"Connected to MongoDB at {settings.DATABASE_URL}")
    yield
    # Shutdown: Close connection
    db.client.close()
    print("Closed MongoDB connection")

# Initialize FastAPI app
app = FastAPI(
    title=settings.PROJECT_NAME,
    openapi_url=f"{settings.API_V1_PREFIX}/openapi.json",
    docs_url=f"{settings.API_V1_PREFIX}/docs",
    redoc_url=f"{settings.API_V1_PREFIX}/redoc",
    lifespan=lifespan
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
async def root():
    """Root endpoint."""
    return {
        "message": "Legal Advisory Platform API",
        "version": "1.0.0",
        "docs": f"{settings.API_V1_PREFIX}/docs"
    }


@app.get("/health")
async def health_check():
    """Health check endpoint."""
    return {"status": "healthy"}


# Include API router
app.include_router(api_router, prefix=settings.API_V1_PREFIX)


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=settings.ENVIRONMENT == "development"
    )
