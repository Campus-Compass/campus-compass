from typing import Dict

from app import db
from app.apis import admin, service, survey
from fastapi import FastAPI

app = FastAPI()
app.include_router(admin.router, prefix="/admin")
app.include_router(service.router, prefix="/service")
app.include_router(survey.router, prefix="/survey")

db.init_db()


@app.get("/")
async def root() -> Dict:
    return {"message": "Hello World"}
