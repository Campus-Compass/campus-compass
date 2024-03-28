from typing import Optional

from app.models.service import Service
from app.models.user import User
from app.services.base import BaseService


class ServiceService(BaseService):
    """Service for service operations."""

    def create_service(self, user_id: str, service_name: str) -> Optional[User]:
        """Creates a new user."""
        service = Service(
            user_id=user_id,
            service_name=service_name,
        )

        self.session.add(service)
        self.session.commit()
        self.session.refresh(service)
        return service
