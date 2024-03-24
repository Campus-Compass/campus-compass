from datetime import datetime
from typing import Optional

from sqlmodel import Field, SQLModel


class Post(SQLModel, table=True):
    """Post entity."""

    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: Optional[str] = Field(default=None, foreign_key="user.user_id")
    title: str
    content: str
    created_at: datetime = Field(default_factory=datetime.now)
    # image: Optional[str] = None
