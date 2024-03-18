from typing import List, Optional

from sqlmodel import Field, Relationship, SQLModel


class Survey(SQLModel, table=True):
    """Survey entity."""

    id: Optional[int] = Field(default=None, primary_key=True)
    service_id: int = Field(foreign_key="service.id")

    questions: List["Question"] = Relationship(back_populates="survey")


class Question(SQLModel, table=True):
    """Question entity."""

    id: Optional[int] = Field(default=None, primary_key=True)
    survey_id: Optional[int] = Field(default=None, foreign_key="survey.id")
    question_text: str

    answers: List["Answer"] = Relationship(back_populates="question")
    survey: Survey = Relationship(back_populates="questions")


class Answer(SQLModel, table=True):
    """Answer entity."""

    id: Optional[int] = Field(default=None, primary_key=True)
    question_id: Optional[int] = Field(default=None, foreign_key="question.id")
    answer_text: str
    recommend_service: bool

    question: Question = Relationship(back_populates="answers")
