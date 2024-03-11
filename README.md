# Campus Compass

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
4. Start the backend server
```
uvicorn app.main:app --port 3000
```

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
2. For the frontend, visit: ```localhost```
3. For the backend, visit: ```localhost/api```
