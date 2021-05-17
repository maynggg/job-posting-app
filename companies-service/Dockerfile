FROM node:14.16-alpine

RUN mkdir -p /app/companies-service
WORKDIR /app/companies-service

COPY package*.json /app/companies-service/
RUN npm install

COPY . /app/companies-service/

CMD ["npm", "run", "start:dev"]