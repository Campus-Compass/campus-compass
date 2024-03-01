# BUILD STAGE
FROM python:3.12 as BUILD

WORKDIR /tmp

RUN pip install poetry

COPY ./pyproject.toml ./poetry.lock* /tmp/

RUN poetry export -f requirements.txt --output requirements.txt --without-hashes

# RUN STAGE
FROM python:3.12 as RUN

WORKDIR /backend

COPY --from=BUILD /tmp/requirements.txt /backend/requirements.txt

RUN pip install --no-cache-dir --upgrade -r /backend/requirements.txt

COPY ./app /backend/app

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8080"]
