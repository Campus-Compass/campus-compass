from typing import Dict

from app.models import db
from fastapi import FastAPI

app = FastAPI()

db.create_db_and_tables()


@app.get("/")
async def root() -> Dict:
    return {"message": "Hello World"}
