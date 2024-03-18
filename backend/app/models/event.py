from datetime import datetime
from typing import Optional

from sqlmodel import Field, SQLModel


class Event(SQLModel, table=True):
    """Event entity for events at the University."""

    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: Optional[int] = Field(default=None, foreign_key="user.id")
    title: str
    content: str
    start_date: datetime
    end_date: datetime
    created_at: datetime = Field(default_factory=datetime.now)
