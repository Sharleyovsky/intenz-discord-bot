FROM node:18.0.0-alpine as build-server

WORKDIR /app

COPY . /app

RUN yarn install
RUN yarn build

CMD ["npm", "run", "start:prod"]