from fastapi import APIRouter
from app.api.routes import chat, articles, cases, procedures

api_router = APIRouter()

# Include all route modules
api_router.include_router(chat.router)
api_router.include_router(articles.router)
api_router.include_router(cases.router)
api_router.include_router(procedures.router)
