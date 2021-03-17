FROM node:15.3.0-alpine3.10

RUN mkdir -p /home/backend/app
WORKDIR /home/backend/app

RUN yarn install --silent
RUN yarn cache clean --all

COPY  . .

EXPOSE 3002
