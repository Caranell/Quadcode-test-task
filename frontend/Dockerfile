FROM node:15.3.0-alpine3.10 as build

RUN mkdir -p /home/frontend/app
WORKDIR /home/frontend/app

COPY package.json yarn.lock ./

RUN yarn install --silent
RUN yarn cache clean --all

COPY . ./

EXPOSE 3000