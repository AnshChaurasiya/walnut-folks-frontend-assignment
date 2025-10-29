"""
Database handler helper module.

This module provides specialized database operations and helper functions
for managing transactions and user data with proper error handling and
connection management.
"""
from typing import Dict, Any, List, Optional
from core.db import DatabaseClient
from core.utils import get_current_timestamp


class UserDataHandler:
    """
    Specialized database handler for user data operations.
    
    This class handles user management and chart data operations
    for the frontend dashboard functionality.
    """
    
    def __init__(self, db_client: DatabaseClient):
        """
        Initialize the user data handler.
        
        Args:
            db_client: The database client instance
        """
        self.db_client = db_client
    
    async def create_or_update_user_chart_data(
        self, 
        email: str, 
        chart_data: Dict[str, Any]
    ) -> Dict[str, Any]:
        """
        Create or update user's chart data with proper validation.
        
        Args:
            email: User's email address
            chart_data: Chart configuration and data
            
        Returns:
            Dict containing the operation result
        """
        try:
            # Validate email format (basic validation)
            if "@" not in email or "." not in email:
                raise ValueError("Invalid email format")
            
            # Save chart data
            success = await self.db_client.save_chart_data(email, chart_data)
            
            return {
                "success": success,
                "email": email,
                "updated_at": get_current_timestamp()
            }
            
        except Exception as e:
            return {
                "success": False,
                "error": str(e),
                "email": email
            }
    
    async def get_user_data_with_defaults(self, email: str) -> Dict[str, Any]:
        """
        Get user's chart data with default values if not found.
        
        Args:
            email: User's email address
            
        Returns:
            Dict containing chart data (either saved or default)
        """
        try:
            # Try to get existing user data
            user_data = await self.db_client.get_user_chart_data(email)
            
            if user_data:
                return {
                    "exists": True,
                    "chart_data": user_data.get("chart_data", {}),
                    "email": email,
                    "last_updated": user_data.get("updated_at")
                }
            else:
                # Return default chart data
                default_chart_data = self._get_default_chart_data()
                return {
                    "exists": False,
                    "chart_data": default_chart_data,
                    "email": email,
                    "last_updated": None
                }
                
        except Exception as e:
            # Return default data on error
            return {
                "exists": False,
                "chart_data": self._get_default_chart_data(),
                "email": email,
                "error": str(e)
            }
    
    def _get_default_chart_data(self) -> Dict[str, Any]:
        """
        Get default chart data for new users.
        
        Returns:
            Dict containing default chart configuration
        """
        return {
            "daily_call_volume": [50, 70, 90, 65, 80, 75, 95],
            "average_call_duration": [120, 135, 110, 145, 130, 125, 140],
            "call_sentiment": {
                "positive": 60,
                "neutral": 25,
                "negative": 15
            },
            "agent_performance": [
                {"name": "Agent A", "calls": 45, "rating": 4.5},
                {"name": "Agent B", "calls": 38, "rating": 4.2},
                {"name": "Agent C", "calls": 52, "rating": 4.8},
                {"name": "Agent D", "calls": 41, "rating": 4.3}
            ],
            "conversion_rate": [12.5, 15.2, 11.8, 14.7, 13.9, 16.1, 15.8]
        }