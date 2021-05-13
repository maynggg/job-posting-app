FROM node:14.16-alpine

RUN mkdir -p /app/db-service
WORKDIR /app/db-service

COPY package*.json /app/db-service/
RUN npm install

COPY . /app/db-service/

CMD ["npm", "run", "start:dev"]