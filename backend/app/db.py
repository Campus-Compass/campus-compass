import os

from app.models.service import Service
from app.models.user import User
from app.utils import database_url, hash
from sqlmodel import Session, create_engine, select

db_url = database_url.get_db_url()
engine = create_engine(db_url)


def init_db():
    with Session(engine) as session:
        user = session.exec(select(User)).first()
        ADMIN_PASSWORD = os.environ.get("ADMIN_PASSWORD", "Admin6969")
        if not user:
            admin = User(
                user_id="admin",
                password=hash.hash_password(ADMIN_PASSWORD),
                role="admin",
            )
            session.add(admin)
            session.commit()
            user = session.exec(select(User)).first()

        service = session.exec(select(Service)).first()
        if not service:
            admin_service = Service(
                user_id=user.user_id,
                service_name="Admin Service",
            )
            session.add(admin_service)
            session.commit()


def get_session():
    with Session(engine) as session:
        yield session
