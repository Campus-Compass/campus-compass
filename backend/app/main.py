from typing import Dict

from app import db
from fastapi import FastAPI

app = FastAPI()

db.init_db()


@app.get("/")
async def root() -> Dict:
    return {"message": "Hello World"}
