import os

from app.models import event, post, service
from app.models.admin import Admin
from app.utils import database_url, hash
from sqlmodel import Session, SQLModel, create_engine, select

db_url = database_url.get_db_url()
engine = create_engine(db_url)


def init_db():
    with Session(engine) as session:
        query = select(Admin)
        result = session.exec(query)
        ADMIN_PASSWORD = os.environ.get("ADMIN_PASSWORD", "Admin6969")

        if not result.first():
            admin = Admin(username="admin", password=hash.hash_password(ADMIN_PASSWORD))
            session.add(admin)
            session.commit()


def create_db_and_tables():
    SQLModel.metadata.create_all(engine)
    init_db()


def get_session():
    with Session(engine) as session:
        yield session
