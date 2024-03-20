from typing import Dict, List

from app.models.service import Service
from app.models.survey import Answer, Question
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

    def read_survey_response(self, survey_response: List) -> Dict:
        """
        Receives a survey response from the frontend.

        Expected response format:
        [
            {
                ...
                "answer_id": 1,
                ...
            }
        ]
        """
        # Get ALL the answer ids from the survey response
        a_ids = []
        for response in survey_response:
            answer_id = response.get("answer_id", None)
            if answer_id:
                a_ids.append(answer_id)

        # only selects the answers with the following quality:
        # - are recommended services
        # - are in the survey response
        statement = (
            select(Answer, Question, Service)
            .where(Answer.id.in_(a_ids))
            .where(Answer.recommend_service)
            .join(Question, Answer.question_id == Question.id)
            .join(Service, Question.user_id == Service.user_id)
        )
        result = self.session.exec(statement).all()

        response = []
        for answer, question, service in result:
            response.append(
                {
                    "question": question.question_text,
                    "answer": answer.answer_text,
                    "service": service,
                }
            )

        return response

    def create_survey(self, questions: List, user_id: str) -> Dict:
        """
        Receives a survey from the frontend.

        Expected survey format:
        [
            {
                "question_text": "What is your favorite color?",
                "answers": [
                    {
                        "answer_text": "Red",
                        "recommend_service": true
                    },
                ]
            }
        ]
        """
        added_questions = []
        added_answers = []
        for received_question in questions:
            question = Question(
                question_text=received_question["question_text"],
                user_id=user_id,
            )
            self.session.add(question)
            self.session.commit()
            added_questions.append(question)

            for received_answer in received_question.get("answers", []):
                answer = Answer(
                    question_id=question.id,
                    answer_text=received_answer.get("answer_text", ""),
                    recommend_service=received_answer.get("recommend_service", False),
                )
                self.session.add(answer)
                self.session.commit()
                added_answers.append(answer)

        return {
            "questions": added_questions,
            "answers": added_answers,
        }
