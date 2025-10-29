"""
Utility functions and helpers for the Transaction Webhook Service.

This module contains common utility functions, decorators, and helpers
that are used across different parts of the application.
"""
import time
import hashlib
import asyncio
from datetime import datetime, timezone
from typing import Any, Dict, Optional, Callable
from functools import wraps


def get_current_timestamp() -> str:
    """
    Get the current UTC timestamp in ISO format.
    
    Returns:
        str: Current UTC timestamp in ISO 8601 format
    """
    return datetime.now(timezone.utc).isoformat()

class ResponseFormatter:
    """Helper class for formatting consistent API responses."""
    
    @staticmethod
    def success(data: Any = None, message: str = "Success") -> Dict[str, Any]:
        """
        Format success response.
        
        Args:
            data: Response data
            message: Success message
            
        Returns:
            Dict: Formatted success response
        """
        response = {
            "status": "success",
            "message": message,
            "timestamp": get_current_timestamp()
        }
        
        if data is not None:
            response["data"] = data
            
        return response
    
    @staticmethod
    def error(message: str, code: str = "INTERNAL_ERROR", details: Any = None) -> Dict[str, Any]:
        """
        Format error response.
        
        Args:
            message: Error message
            code: Error code
            details: Additional error details
            
        Returns:
            Dict: Formatted error response
        """
        response = {
            "status": "error",
            "error": {
                "code": code,
                "message": message
            },
            "timestamp": get_current_timestamp()
        }
        
        if details is not None:
            response["error"]["details"] = details
            
        return response
    
    @staticmethod
    def accepted(message: str = "Request accepted for processing") -> Dict[str, Any]:
        """
        Format accepted response for async processing.
        
        Args:
            message: Acceptance message
            
        Returns:
            Dict: Formatted accepted response
        """
        return {
            "status": "ACCEPTED",
            "message": message,
            "timestamp": get_current_timestamp()
        }