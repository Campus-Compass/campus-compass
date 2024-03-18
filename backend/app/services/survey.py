from typing import Dict, List

from app.models.survey import Question
from app.services.base import BaseService
from sqlmodel import select


class SurveyService(BaseService):
    """Service for survey operations."""

    def get_survey(self) -> List[Dict]:
        """Returns all questions and answers in the survey."""
        statement = select(Question)
        result = self.session.exec(statement).all()
        survey = []
        for question in result:
            question_dict = question.model_dump()
            question_dict["answers"] = [
                answer.model_dump() for answer in question.answers
            ]
            survey.append(question_dict)
        return survey

    def read_survey_response(self, survey_response: Dict) -> Dict:
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
