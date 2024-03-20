from typing import List, Optional

from app.models.user import User
from sqlmodel import Field, Relationship, SQLModel


class Question(SQLModel, table=True):
    """Question entity."""

    id: Optional[int] = Field(default=None, primary_key=True)
    user_id: Optional[str] = Field(default=None, foreign_key="user.user_id")
    question_text: str

    answers: List["Answer"] = Relationship(back_populates="question")
    user: User = Relationship(back_populates="questions")


class Answer(SQLModel, table=True):
    """Answer entity."""

    id: Optional[int] = Field(default=None, primary_key=True)
    question_id: Optional[int] = Field(default=None, foreign_key="question.id")
    answer_text: str
    recommend_service: bool

    question: Question = Relationship(back_populates="answers")
