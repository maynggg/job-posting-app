<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# Job Posting App

## Description
[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

This project aims to replicate basic functionalities of a job posting web application.
- **Back-end development:** Node.js, Nest.js, MongoDB, REST API for CRUD database services, GraphQL for backend for frontend (BFF) services, JWT.
- **Unit testing.**
- **Docker.**

## Development Guide
1. Install Docker. See this [link](https://docs.docker.com/docker-for-mac/install/) for installation guide on Mac OS.
2. Set the working directory to this repo `$ cd job-posting-app`.
3. Create a `.env` file and add the necessary environment variables. See `.env.example` for example.
4. Run the development servers by running this command: `$ docker-compose -f docker-compose.yml up --build`. All apps will be available at your chosen port in `.env`.
5. Make a `POST` request to the following URL to generate seed data: `http://localhost:<SEED_SERVICE_PORT>/seed`. CAUTION: doing this will drop the database and recreate the seed data. 
Seed data can be viewed in `seed-service/src/app.controller.ts`.

## Project Structure
Five microservices were built for this application: 
- `vacancies-services` for handling services related to vacancies.
- `companies-services` for handling services related to companies.
- `users-services` for handling services related to users.
- `seed-service` to generate seed data.
- `bff` for handling backend for frontend API services.


## API Documentation
- REST API documentation can be found in `README.md` file in each microservice - `vacancies-services`, `companies-services`, and `users-services`.
- GraphQL API documentation can be found [here](https://github.com/ngannguyen75/job-posting-app/blob/master/bff/README.md).

## Authentication
This application uses JSON Web Token (JWT) to handle authentication. The token needs to be passed with each request using the Authorization header with Token scheme. The Authorization header must have the form of: `Bearer [your token here]`.

## Authorization
- There exist a `RolesGuard` in `vacancies-services` to ensure that a user with an admin role can view, create, update, and remove job vacancies; and a user without an admin role can only view job vacancies.
- **Note:** a user can only create, update, and remove a job vacancy for his/her own company.

## Testing
Testing documentation can be found in `README.md` in each microservice.
