from app.db import get_session
from app.models.user import User, UserRole
from app.schemas.auth import BaseAuthDetails
from app.services.user import UserService
from app.utils.auth import get_auth_handler
from fastapi import APIRouter, Depends, HTTPException, status
from sqlmodel import Session

router = APIRouter()
auth_handler = get_auth_handler()


def user_register(
    user_info: BaseAuthDetails, role: UserRole, session: Session = Depends(get_session)
) -> User:
    if (
        UserService(session).get_user_by_user_id(user_id=user_info.user_id, role=role)
        is not None
    ):
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT, detail="Username already taken."
        )

    user = UserService(session).create_user(
        user_id=user_info.user_id, password=user_info.password, role=role
    )

    return user


def user_login(
    user_info: BaseAuthDetails,
    role: UserRole,
    session: Session = Depends(get_session),
) -> User:
    user: User = UserService(session).get_user_by_user_id(
        user_id=user_info.user_id, role=role
    )
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"No user '{user_info.user_id}' with role {role.name}.",
        )

    if not auth_handler.verify_password(
        plain_password=user_info.password, hashed_password=user.password
    ):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect password.",
        )
    token = auth_handler.encode_token(user.user_id)
    return {"access_token": token, "token_type": "bearer"}
