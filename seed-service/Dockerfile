FROM node:14.16-alpine

RUN mkdir -p /app/seed-service
WORKDIR /app/seed-service

COPY package*.json /app/seed-service/
RUN npm install

COPY . /app/seed-service/

CMD ["npm", "run", "start:dev"]