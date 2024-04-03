from typing import Dict

from app import db
from app.apis import admin, service, survey
from fastapi import FastAPI, status
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.include_router(admin.router, prefix="/admin")
app.include_router(service.router, prefix="/service")
app.include_router(survey.router, prefix="/survey")

origins = [
    "http://test-frontend.campuscompass.online",
    "campuscompass.online",
    "http://campuscompass.online",
    "http://frontend.campuscompass.online",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def startup_event():
    db.init_db()


@app.get(
    "/",
    status_code=status.HTTP_200_OK,
)
async def root() -> Dict:
    return {"message": "Hello World"}
