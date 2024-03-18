from typing import Dict, List

from app.db import get_session
from app.services.survey import SurveyService
from app.utils.auth import get_auth_handler
from fastapi import APIRouter, Depends, status
from sqlmodel import Session

router = APIRouter()
auth_handler = get_auth_handler()


@router.get(
    "/",
    tags=["survey"],
    status_code=status.HTTP_200_OK,
)
async def get_survey(
    session: Session = Depends(get_session),
    # user_id: str = Depends(auth_handler.auth_wrapper),
) -> List[Dict]:
    return SurveyService(session).get_survey()


@router.post(
    "/",
    tags=["survey"],
    status_code=status.HTTP_200_OK,
)
async def submit_survey(
    session: Session = Depends(get_session),
    user_id: str = Depends(auth_handler.auth_wrapper),
) -> Dict:
    return {"message": "not implemented yet"}
