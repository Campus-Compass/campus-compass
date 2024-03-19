from enum import Enum
from typing import Optional

from sqlmodel import Field, SQLModel


class UserRole(Enum):
    """Enums for categorizing user roles."""

    ADMIN = "admin"
    SERVICE = "service"
    STUDENT = "student"


class User(SQLModel, table=True):
    """Generic User entity."""

    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: str = Field(unique=True)
    password: str
    role: UserRole
