import os

from app.models.user import User
from app.utils import database_url, hash
from sqlmodel import Session, create_engine, select

db_url = database_url.get_db_url()
engine = create_engine(db_url)


def init_db():
    with Session(engine) as session:
        query = select(User)
        result = session.exec(query)
        ADMIN_PASSWORD = os.environ.get("ADMIN_PASSWORD", "Admin6969")

        if not result.first():
            admin = User(
                user_id="admin",
                password=hash.hash_password(ADMIN_PASSWORD),
                role="admin",
            )
            session.add(admin)
            session.commit()
    

def get_session():
    with Session(engine) as session:
        yield session
