import os

from app.models.admin import Admin
from app.utils import hash
from dotenv import load_dotenv
from sqlmodel import Session, SQLModel, create_engine, select

load_dotenv()
DB_USER = os.environ.get("DB_USER", "my_user")
DB_PASSWORD = os.environ.get("DB_PASSWORD", "my_password")
DB_ROOT_PASSWORD = os.environ.get("DB_ROOT_PASSWORD", "my_password")
DB_HOST = os.environ.get("DB_HOST", "localhost")
DB_PORT = os.environ.get("DB_PORT", "3306")
DB_NAME = os.environ.get("DB_NAME", "my_database")

db_url = f"mysql+pymysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
engine = create_engine(db_url)


def create_db_and_tables():
    SQLModel.metadata.create_all(engine)
    init_db()


def init_db():
    with Session(engine) as session:
        query = select(Admin)
        result = session.exec(query)
        ADMIN_PASSWORD = os.environ.get("ADMIN_PASSWORD", "Admin6969")

        if not result.first():
            admin = Admin(username="admin", password=hash(ADMIN_PASSWORD))
            session.add(admin)
            session.commit()


def get_session():
    with Session(engine) as session:
        yield session
