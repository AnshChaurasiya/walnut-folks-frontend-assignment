"""
API v1 route definitions and initialization.

This module centralizes all v1 API route registrations following the
clean routing architecture pattern. It imports all endpoint routers
and registers them with the main API router.
"""
from fastapi import APIRouter
from .chart_data import router as chart_data_router

# Create the main v1 API router
api_v1_router = APIRouter()


def initialize_v1_routes(app_router: APIRouter) -> None:
    """
    Initialize and register all v1 API routes.
    
    This function follows the routing architecture pattern by centralizing
    all route registrations in a single place, making it easy to manage
    and organize endpoints.
    
    Args:
        app_router: The main application router to register routes with
    """
    
    # =============================================================================
    # CHART DATA ENDPOINTS
    # =============================================================================
    app_router.include_router(
        chart_data_router,
        prefix="/api/v1",
        tags=["Chart Data"]
    )