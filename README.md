# Campus Compass

Find all your university's services and information on Campus Compass!

<br/>

## Setting up your environment
- Rename .env.defaults to .env

<br/>

## Run the Backend
1. Go to the backend directory and run the following commands to create a poetry environment:
```
poetry shell
poetry install
```
2. Run ```pre-commit install``` so that the pre-commit hook runs automatically on commit (run ```pre-commit run --all-files``` to manually run the pre-commit hook on the entire repo)
3. Start the backend server
```uvicorn app.main:app --port 3000```

<br/>

## Run the Frontend
1. Go to frontend directory and run the following commands to setup the environment:
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
2. For the frontend, visit: localhost
3. For the backend, visit: localhost/api
