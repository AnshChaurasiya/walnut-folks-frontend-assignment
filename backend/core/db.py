"""
Database connection and client management for Supabase.

This module provides a centralized way to manage database connections,
initialize Supabase clients, and handle database operations with proper
error handling and connection pooling.
"""
import asyncio
from datetime import datetime, timezone
from typing import Optional, Dict, Any, List
from supabase import create_client, Client
from core.config import get_settings

settings = get_settings()


class DatabaseClient:
    """
    Supabase database client wrapper with async support.
    
    Provides a centralized interface for all database operations
    with proper error handling and connection management.
    """
    
    def __init__(self):
        """Initialize the database client."""
        self._client: Optional[Client] = None
        self._service_client: Optional[Client] = None
    
    def get_client(self) -> Client:
        """
        Get the regular Supabase client for standard operations.
        
        Returns:
            Client: Supabase client instance
        """
        if not self._client:
            self._client = create_client(
                settings.SUPABASE_URL,
                settings.SUPABASE_KEY
            )
        return self._client
    
    def get_service_client(self) -> Client:
        """
        Get the service role client for admin operations.
        
        Returns:
            Client: Supabase service role client instance
        """
        if not self._service_client and settings.SUPABASE_SERVICE_ROLE_KEY:
            self._service_client = create_client(
                settings.SUPABASE_URL,
                settings.SUPABASE_SERVICE_ROLE_KEY
            )
        return self._service_client or self.get_client()

    async def get_user_chart_data(self, email: str) -> Optional[Dict[str, Any]]:
        """
        Retrieve user's chart data by email.
        
        Args:
            email: User's email address
            
        Returns:
            Dict containing chart data or None if not found
        """
        try:
            client = self.get_client()
            response = client.table(settings.CHART_DATA_TABLE)\
                           .select("*")\
                           .eq("email", email)\
                           .execute()
            
            return response.data[0] if response.data else None
            
        except Exception as e:
            print(f"Error fetching chart data for {email}: {str(e)}")
            return None
    
    async def save_chart_data(self, email: str, chart_data: Dict[str, Any]) -> bool:
        """
        Save or update user's chart data.
        
        Args:
            email: User's email address
            chart_data: Chart configuration and data
            
        Returns:
            bool: True if save was successful, False otherwise
        """
        try:
            client = self.get_client()
            current_time = datetime.now(timezone.utc).isoformat()
            
            # Check if user data exists
            existing = await self.get_user_chart_data(email)
            
            if existing:
                # Update existing record
                response = client.table(settings.CHART_DATA_TABLE)\
                               .update({"chart_data": chart_data, "updated_at": current_time})\
                               .eq("email", email)\
                               .execute()
                print(f"📝 Updated chart data for {email}")
            else:
                # Create new record
                response = client.table(settings.CHART_DATA_TABLE)\
                               .insert({
                                   "email": email,
                                   "chart_data": chart_data,
                                   "created_at": current_time,
                                   "updated_at": current_time
                               })\
                               .execute()
                print(f"✨ Created new chart data for {email}")
            
            if response.data:
                print(f"✅ Successfully saved chart data for {email}")
                return True
            else:
                print(f"❌ No data returned when saving for {email}")
                return False
            
        except Exception as e:
            print(f"❌ Error saving chart data for {email}: {str(e)}")
            return False


# Global database client instance
db_client = DatabaseClient()


def get_db_client() -> DatabaseClient:
    """
    Dependency function to get database client instance.
    
    Returns:
        DatabaseClient: The database client instance
    """
    return db_client