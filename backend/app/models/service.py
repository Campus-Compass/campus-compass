from typing import Optional

from sqlmodel import Field, SQLModel


class Service(SQLModel, table=True):
    """Service entity (formerly known as Department)."""

    id: Optional[int] = Field(default=None, primary_key=True)
    service_name: str
    username: str
    password: str
