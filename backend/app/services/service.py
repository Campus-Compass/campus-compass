from http.client import HTTPException
from typing import Optional

from app.models.service import Service
from app.schemas.profile import BaseServiceProfile
from app.services.base import BaseService
from app.utils.auth import AuthHandler
from sqlmodel import select

auth_handler = AuthHandler()


class ServiceService(BaseService):
    """Service for service operations."""

    def get_all_service_info(self) -> Optional[Service]:
        """Returns a service by its id."""
        statement = select(Service)
        return self.session.exec(statement).all()

    def get_service_info_by_user_id(self, user_id: str) -> Optional[Service]:
        """Returns a service by user_id."""
        statement = select(Service).where(Service.user_id == user_id)
        return self.session.exec(statement).one_or_none()

    def edit_service_profile(
        self, service_profile: BaseServiceProfile, user_id: str
    ) -> Optional[Service]:
        """Edit service profile."""
        service = self.get_service_info_by_user_id(user_id)
        if not service:
            raise HTTPException(
                status_code=401,
                detail="Unauthorized access: Needs to be a service user.",
            )

        service.service_name = service_profile.service_name
        service.email = service_profile.email
        service.phone_number = service_profile.phone_number
        service.address = service_profile.address
        service.website_url = service_profile.website_url

        self.session.add(service)
        self.session.commit()
        self.session.refresh(service)
        return service
