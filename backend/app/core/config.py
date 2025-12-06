from pydantic_settings import BaseSettings
from pydantic import validator
from typing import List


class Settings(BaseSettings):
    """Application settings."""
    
    # Database - Using MongoDB
    DATABASE_URL: str = "mongodb://localhost:27017"
    DATABASE_NAME: str = "legal_advisory_db"
    
    # Redis
    REDIS_URL: str = "redis://localhost:6379"
    
    # AI APIs
    OPENAI_API_KEY: str = ""
    ANTHROPIC_API_KEY: str = ""
    
    # JWT
    SECRET_KEY: str = "dev-secret-key"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 30
    
    # CORS
    CORS_ORIGINS: str = "*"
    
    # Environment
    ENVIRONMENT: str = "development"
    
    # API
    API_V1_PREFIX: str = "/api/v1"
    PROJECT_NAME: str = "Legal Advisory Platform API"
    
    @property
    def cors_origins_list(self) -> List[str]:
        """Convert CORS origins string to list."""
        return [origin.strip() for origin in self.CORS_ORIGINS.split(",")]
    
    @validator("DATABASE_URL", pre=True)
    def assemble_db_connection(cls, v: str | None, values: dict[str, any]) -> str:
        # In production, this comes from env vars
        if not v:
            return "mongodb://localhost:27017" # Default fallback for local
        return v

    class Config:
        env_file = ".env"
        case_sensitive = True


settings = Settings()
