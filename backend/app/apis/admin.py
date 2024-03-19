from typing import Dict

from app.apis.base_api import base_user_api
from app.db import get_session
from app.models.user import UserRole
from app.schemas.auth import BaseAuthDetails
from app.utils.auth import get_auth_handler
from fastapi import APIRouter, Depends, status
from sqlmodel import Session

router = APIRouter()
auth_handler = get_auth_handler()


@router.post(
    "/login",
    tags=["admin"],
    status_code=status.HTTP_200_OK,
)
async def login(
    user_info: BaseAuthDetails, session: Session = Depends(get_session)
) -> Dict:
    return base_user_api.user_login(user_info, UserRole.ADMIN, session)
