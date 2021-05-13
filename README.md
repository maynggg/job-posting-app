# Job Posting App

## Description
[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

This project aims to replicate basic functionalities of a job posting web application.
- **Back-end development:** Node.js, Nest.js, MongoDB, REST API, GraphQL, JWT.
- **Unit testing.**
- **Docker.**

## Development Guide
1. Install Docker. See this [link](https://docs.docker.com/docker-for-mac/install/) for installation guide on Mac OS.
2. Set the working directory to this repo `$ cd job-posting-app`.
3. Create a `.env` file and add the necessary environment variables. See `.env.example` for example.
4. Run the development server and web app by running this command: `$ docker-compose -f dev-docker-compose.yml up --build`. Both app will be available at your chosen port in `.env`.
5. Make a `POST` request to the following URL to generate seed data: `http://<DB_SERVICE_BASE_URL>:<DB_SERVICE_PORT>/seed`. CAUTION: doing this will drop the database and recreate  the seed data. Seed data can be viewed in `db-service/src/app.controller.ts`.

## Project Structure
Two microservices were built for this application: 
- `DB-SERVICE` uses REST API for CRUD database services
- `BFF` uses GraphQL for backend for frontend services.

Each microservice has three main modules: `companies`, `users`, and `vacancies`.

## API Documentation
API documentation can be found in `README.md` in each microservice - `DB-SERVICE` and `BFF`.

## Authentication
This application uses JSON Web Token (JWT) to handle authentication. The token needs to be passed with each request using the Authorization header with Token scheme. The Authorization header must have the form of: `Bearer [your token here]`.

## Authorization
There exist two guards in `DB-SERVICE`: `CompanyGuard` and `RolesGuard`:
- `CompanyGuard` ensures that a user can only create, update, and remove a job vacancy for his/her own company.
- `RolesGuard` ensures that a user with an admin role can view, create, update, and remove job vacancies; and a user without an admin role can only view job vacancies.

## Testing
Testing documentation can be found in `README.md` in each microservice - `DB-SERVICE` and `BFF`.
