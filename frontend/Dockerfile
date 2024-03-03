# BUILD STAGE
FROM node:20.8.0-alpine AS BUILD

WORKDIR /app

# Installing dependencies
COPY ./app/package.json ./
RUN npm install

# Copying all the files in our project
COPY ./app .

# Building our application
RUN npm run build

# RUN STAGE
FROM nginx AS RUN

COPY --from=BUILD /app/build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf
