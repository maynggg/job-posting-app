FROM node:14.16-alpine

RUN mkdir -p /app/bff
WORKDIR /app/bff

COPY package*.json /app/bff/
RUN npm install

COPY . /app/bff/

CMD ["npm", "run", "start:dev"]