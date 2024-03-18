from typing import List

from app.models.survey import Question
from app.services.base import BaseService
from sqlmodel import select


class SurveyService(BaseService):
    """Service for survey operations."""

    def get_survey(self) -> List[Question]:
        """Returns all questions and answers in the survey."""
        statement = select(Question)
        return self.session.exec(statement).all()

    def read_survey_response(self, survey_response: dict) -> dict:
        """
        Receives a survey response from the frontend.

        Expected response format:
        {
            "question_id": 1,
            "answer_id": 1
        }
        """
        # TODO: add Service ID to the Answer entity
        return {}
