from typing import Optional

from sqlmodel import Field, SQLModel


class Admin(SQLModel, table=True):
    """Admin entity."""

    id: Optional[int] = Field(default=None, primary_key=True)
    username: str
    password: str
