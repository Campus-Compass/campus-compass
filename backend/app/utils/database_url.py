import os

from dotenv import load_dotenv

load_dotenv()
DB_USER = os.environ.get("DB_USER", "my_user")
DB_PASSWORD = os.environ.get("DB_PASSWORD", "my_password")
DB_ROOT_PASSWORD = os.environ.get("DB_ROOT_PASSWORD", "my_password")
DB_HOST = os.environ.get("DB_HOST", "localhost")
DB_PORT = os.environ.get("DB_PORT", "3306")
DB_NAME = os.environ.get("DB_NAME", "my_database")


def get_db_url() -> str:
    return f"mysql+pymysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
