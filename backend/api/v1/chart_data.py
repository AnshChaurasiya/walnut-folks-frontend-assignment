"""
Chart Data API endpoints for managing user analytics data.

This module provides endpoints for saving and retrieving user chart data
from Supabase, supporting the frontend dashboard functionality.
"""
from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from typing import Dict, Any, List
from core.db import get_db_client
import logging

router = APIRouter()
logger = logging.getLogger(__name__)

# =============================================================================
# PYDANTIC MODELS
# =============================================================================

class ChartDataRequest(BaseModel):
    """Request model for chart data operations."""
    email: str
    chart_data: Dict[str, Any]

class ChartDataResponse(BaseModel):
    """Response model for chart data retrieval."""
    email: str
    chart_data: Dict[str, Any]
    is_existing: bool
    created_at: str
    updated_at: str

class UserChartDataResponse(BaseModel):
    """Response model for user chart data with defaults."""
    data: Dict[str, Any]
    is_existing: bool

# Default chart data structure
DEFAULT_CHART_DATA = {
    "daily_call_volume": [45, 52, 48, 61, 55, 67, 59],
    "average_call_duration": [120, 135, 142, 128, 151, 139, 145],
    "call_sentiment": {"positive": 68, "neutral": 24, "negative": 8},
    "agent_performance": [
        {"name": "Agent Alpha", "calls": 245, "rating": 4.8},
        {"name": "Agent Beta", "calls": 189, "rating": 4.6},
        {"name": "Agent Gamma", "calls": 167, "rating": 4.7},
        {"name": "Agent Delta", "calls": 203, "rating": 4.5}
    ],
    "conversion_rate": [72, 68, 75, 71, 79, 74, 77]
}

# =============================================================================
# ENDPOINTS
# =============================================================================

@router.get("/chart-data/{email}", response_model=UserChartDataResponse)
async def get_user_chart_data(
    email: str,
    db_client = Depends(get_db_client)
):
    """
    Get user's chart data from Supabase.
    
    Args:
        email: User's email address
        db_client: Database client instance
        
    Returns:
        Chart data (either saved or default) with existence flag
    """
    try:
        # Query user's chart data
        user_data = await db_client.get_user_chart_data(email)
        
        if user_data:
            # User has existing data
            return UserChartDataResponse(
                data=user_data["chart_data"],
                is_existing=True
            )
        else:
            # Return default data for new user
            return UserChartDataResponse(
                data=DEFAULT_CHART_DATA,
                is_existing=False
            )
            
    except Exception as e:
        logger.error(f"Error fetching chart data for {email}: {str(e)}")
        # Return default data on error
        return UserChartDataResponse(
            data=DEFAULT_CHART_DATA,
            is_existing=False
        )


@router.post("/chart-data", response_model=Dict[str, Any])
async def save_user_chart_data(
    request: ChartDataRequest,
    db_client = Depends(get_db_client)
):
    """
    Save or update user's chart data in Supabase.
    
    Args:
        request: Chart data request with email and data
        db_client: Database client instance
        
    Returns:
        Success response with saved data info
    """
    try:
        # Save chart data using the database client
        success = await db_client.save_chart_data(request.email, request.chart_data)
        
        if success:
            return {
                "success": True,
                "message": "Chart data saved successfully",
                "email": request.email
            }
        else:
            raise HTTPException(status_code=500, detail="Failed to save chart data")
        
    except Exception as e:
        logger.error(f"Error saving chart data for {request.email}: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to save chart data: {str(e)}")


@router.delete("/chart-data/{email}")
async def delete_user_chart_data(
    email: str,
    db_client = Depends(get_db_client)
):
    """
    Delete user's chart data from Supabase.
    
    Args:
        email: User's email address
        db_client: Database client instance
        
    Returns:
        Success response
    """
    try:
        client = db_client.get_client()
        client.table("chart_data").delete().eq("email", email).execute()
        
        return {
            "success": True,
            "message": f"Chart data deleted for {email}",
            "email": email
        }
        
    except Exception as e:
        logger.error(f"Error deleting chart data for {email}: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to delete chart data: {str(e)}")


@router.get("/chart-data")
async def list_all_users(db_client = Depends(get_db_client)):
    """
    List all users with chart data (for admin purposes).
    
    Args:
        db_client: Database client instance
        
    Returns:
        List of users with their basic info
    """
    try:
        client = db_client.get_client()
        response = client.table("chart_data").select("email, created_at, updated_at").execute()
        
        return {
            "success": True,
            "users": response.data,
            "total": len(response.data) if response.data else 0
        }
        
    except Exception as e:
        logger.error(f"Error listing users: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to list users: {str(e)}")