from typing import Optional

from sqlmodel import Field, SQLModel


class EventPost(SQLModel, table=True):
    """An intermediate table for mapping Event to Post."""

    id: int = Field(default=None, primary_key=True)
    event_id: Optional[int] = Field(default=None, foreign_key="event.id")
    post_id: Optional[int] = Field(default=None, foreign_key="post.id")
