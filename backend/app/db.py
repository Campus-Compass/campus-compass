import os

from app.models.admin import Admin
from app.utils import database_url, hash
from sqlmodel import Session, create_engine, select

db_url = database_url.get_db_url()
engine = create_engine(db_url)


def init_db():
    # SQLModel.metadata.create_all(engine)
    with Session(engine) as session:
        query = select(Admin)
        result = session.exec(query)
        ADMIN_PASSWORD = os.environ.get("ADMIN_PASSWORD", "Admin6969")

        if not result.first():
            admin = Admin(username="admin", password=hash.hash_password(ADMIN_PASSWORD))
            session.add(admin)
            session.commit()


def get_session():
    with Session(engine) as session:
        yield session
