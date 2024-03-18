from typing import Optional

from sqlmodel import Field, SQLModel


class Service(SQLModel, table=True):
    """Service entity (formerly known as Department)."""

    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: int = Field(foreign_key="user.id")
    service_name: str
    email: Optional[str] = None
    phone_number: Optional[str] = None
    address: Optional[str] = None
    website_url: Optional[str] = None
