import pytest
from app.db import get_session
from app.main import app
from fastapi import status
from fastapi.testclient import TestClient
from sqlmodel import Session, SQLModel, create_engine
from sqlmodel.pool import StaticPool

TEST_URL = "/"


# this is used for creating "fake" empty database for testing
@pytest.fixture(name="session")
def session_fixture():
    engine = create_engine(
        "sqlite:///:memory:",
        connect_args={"check_same_thread": False},
        poolclass=StaticPool,
    )
    SQLModel.metadata.create_all(engine)
    with Session(engine) as session:
        yield session


# this is used for creating a simulated backend session
@pytest.fixture(name="client")
def client_fixture(session: Session):
    def get_session_override() -> Session:
        return session

    app.dependency_overrides[get_session] = get_session_override

    client = TestClient(app)
    yield client
    app.dependency_overrides.clear()


def test_main(session: Session, client: TestClient):
    response = client.get(
        TEST_URL,
    )
    data = response.json()

    # this is a sample for when you want to send POST request with a Body
    # response = client.post(
    #     TEST_URL,
    #     json={"send_data_here": "data"},
    # )

    assert response.status_code == status.HTTP_200_OK
    assert data["message"] == "Hello World"
