from typing import Optional

from pydantic import BaseModel


class BaseServiceProfile(BaseModel):
    """Data class that defines the structure of the request body for the user login and register endpoints."""

    service_name: str
    email: Optional[str]
    phone_number: Optional[str]
    address: Optional[str]
    website_url: Optional[str]
