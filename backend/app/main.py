from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api.router import api_router

from contextlib import asynccontextmanager

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: Load JSON Data
    print(f"Starting {settings.PROJECT_NAME} with JSON storage...")
    try:
        from app.core.database import db
        # Data is loaded automatically on import of db instance
        print("✅ Data Service Ready")
    except Exception as e:
        print(f"❌ Error initializing data: {e}")
    
    yield
    # Shutdown
    print("Shutting down...")

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
        "docs": f"{settings.API_V1_PREFIX}/docs",
        "storage": "JSON File System"
    }


@app.get("/health")
async def health_check():
    """Health check endpoint."""
    from app.core.database import db
    status = "healthy" if db.articles else "degraded"
    return {
        "status": status,
        "articles_count": len(db.articles),
        "cases_count": len(db.cases)
    }


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
