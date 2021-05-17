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
5. Make a `POST` request to the following URL to generate seed data: `http://localhost:<SEED_SERVICE_PORT>/seed`. CAUTION: doing this will drop the database and recreate  the seed data. 
Seed data can be viewed in `seed-service/src/app.controller.ts`.

## Project Structure
Five microservices were built for this application: 
- `vacancies-services` for handling services related to vacancies.
- `companies-services` for handling services related to companies.
- `users-services` for handling services related to users.
- `seed-service` to generate seed data.
- `bff` for handling backend for frontend API services.


## API Documentation
REST API documentation can be found in `README.md` file in each microservice.
GraphQL API documentation can be found [here](https://github.com/ngannguyen75/job-posting-app/blob/master/bff/README.md).

## Authentication
This application uses JSON Web Token (JWT) to handle authentication. The token needs to be passed with each request using the Authorization header with Token scheme. The Authorization header must have the form of: `Bearer [your token here]`.

## Authorization
- There exist a `RolesGuard` in `vacancies-services` to ensure that a user with an admin role can view, create, update, and remove job vacancies; and a user without an admin role can only view job vacancies.
- Note: a user can only create, update, and remove a job vacancy for his/her own company.

## Testing
Testing documentation can be found in `README.md` in each microservice.
