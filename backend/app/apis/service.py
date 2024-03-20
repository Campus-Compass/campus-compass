from typing import Dict

from app.apis.base_api import base_user_api
from app.db import get_session
from app.models.user import User, UserRole
from app.schemas.auth import BaseAuthDetails
from app.utils.auth import get_auth_handler
from fastapi import APIRouter, Depends, status
from sqlmodel import Session

router = APIRouter()
auth_handler = get_auth_handler()


@router.post(
    "/login",
    tags=["service"],
    status_code=status.HTTP_200_OK,
)
async def login(
    user_info: BaseAuthDetails, session: Session = Depends(get_session)
) -> Dict:
    return base_user_api.user_login(user_info, UserRole.SERVICE, session)


@router.post(
    "/register",
    tags=["service"],
    status_code=status.HTTP_201_CREATED,
    response_model=User,
)
async def register_service(
    user_info: BaseAuthDetails,
    session: Session = Depends(get_session),
    # user_id: str = Depends(auth_handler.auth_wrapper),
) -> User:
    return base_user_api.user_register(user_info, UserRole.SERVICE, session)
