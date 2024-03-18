from pydantic import BaseModel


class BaseAuthDetails(BaseModel):
    """Data class that defines the structure of the request body for the user login and register endpoints."""

    user_id: str
    password: str
