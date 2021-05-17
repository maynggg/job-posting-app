FROM node:14.16-alpine

RUN mkdir -p /app/users-service
WORKDIR /app/users-service

COPY package*.json /app/users-service/
RUN npm install

COPY . /app/users-service/

CMD ["npm", "run", "start:dev"]