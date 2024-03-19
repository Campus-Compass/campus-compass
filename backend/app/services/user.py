from typing import Optional

from app.models.user import User, UserRole
from app.services.base import BaseService
from app.utils.auth import AuthHandler
from sqlmodel import select

auth_handler = AuthHandler()


class UserService(BaseService):
    """Service for user operations."""

    def get_user_by_user_id(self, user_id: str, role: UserRole) -> Optional[User]:
        """Returns a user by user_id and role."""
        statement = select(User).where(User.user_id == user_id, User.role == role)
        return self.session.exec(statement).one_or_none()

    def create_user(
        self, user_id: str, password: str, role: UserRole
    ) -> Optional[User]:
        """Creates a new user."""
        user = User(
            user_id=user_id,
            password=auth_handler.get_password_hash(password),
            role=role,
        )
        self.session.add(user)
        self.session.commit()
        self.session.refresh(user)
        return user
