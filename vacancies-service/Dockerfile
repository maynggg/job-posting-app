FROM node:14.16-alpine

RUN mkdir -p /app/vacancies-service
WORKDIR /app/vacancies-service

COPY package*.json /app/vacancies-service/
RUN npm install

COPY . /app/vacancies-service/

CMD ["npm", "run", "start:dev"]