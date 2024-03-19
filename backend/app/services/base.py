from sqlmodel import Session


class SessionMixin:
    """Provides instance of database session."""

    def __init__(self, session: Session) -> None:
        """Constructor."""
        self.session = session


class BaseService(SessionMixin):
    """Base class for application services."""
