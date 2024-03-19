# Campus Compass
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=Campus-Compass_campus-compass&metric=coverage)](https://sonarcloud.io/summary/new_code?id=Campus-Compass_campus-compass)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=Campus-Compass_campus-compass&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=Campus-Compass_campus-compass)

Find all your university's services and information on Campus Compass!

<br/>

## Setting up your environment
1. Rename .env.defaults to .env

<br/>

## Run the Backend
1. Go to the backend directory and run the following commands to create a poetry environment:
```
poetry shell
poetry install
```
2. Enable pre-commit to run automatically on commit:
```
pre-commit install
```
3. Run pre-commit manually with this command:
```
pre-commit run --all-files
```
4. Set up the database
```
alembic upgrade head
```
5. Start the backend server
```
uvicorn app.main:app --port 3000
```

<br/>

## Updating Database
1. Commit changes to the database
(run after making any changes to a Model)
```
```
2. Apply any new changes to the database
(should run every time the backend has been touched)
```
alembic upgrade head
```

Credits: https://stackoverflow.com/questions/68932099/how-to-get-alembic-to-recognise-sqlmodel-database-model

<br/>

## Run the Frontend
1. Move to /app inside the frontend directory and run the following commands to setup the environment:
```
npm install
```
2. Start the development server:
```
npm run start
```

<br/>

## Run the System
As of now the system looks like this:
<br/>
<img src="https://github.com/Campus-Compass/campus-compass/assets/124282311/cabf5995-5b11-4135-8f32-c32340b89857" alt="drawing" width="800"/>
<br/>

1. Go to the root directory of the project and run docker-compose (make sure to have Docker running):
```
docker compose up
```
2. For the frontend, visit: ```localhost```
3. For the backend, visit: ```localhost/api```
