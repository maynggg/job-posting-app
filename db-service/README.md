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

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Testing API locally
### Authentication Header
`Authorization: Bearer [your JWT here]`

### Endpoints
#### Users
1. `POST /users/signup`
- No authentication required. 
- Return a User.
- Required fields: companyId, name, username, password, role.
- Role must be enum: 'user' or 'admin'.
- Sample request body: 
    ```bash
    {
        "companyId": "5e5df7fc6953acd3dc50fe8f",
        "name": "Jack Doe",
        "username": "jack",
        "password": "jack",
        "role": "admin"
    }
    ```

2. `POST /users/login`
- No authentication required. 
- Return an access token and a User.
- Required fields: username, password.
- Sample request body: 
    ```bash
    {
        "username": "mark",
        "password": "mark"
    }
    ```

3. `GET /users`
- Authentication required. 
- Return all users within this user's company.

4. `GET /users/:id`
- Authentication required. 
- Return a user with the specified ID.

#### Vacancies
1. `GET /vacancies`
- Authentication required. 
- Return all job vacancies posted by this user's company.

2. `GET /vacancies/:id`
- Authentication required. 
- Return a job vacancy with the specified ID.

#### Companies
1. `GET /companies`
- Authentication required. 
- Return all companies.

2. `GET /companies/:id`
- Authentication required. 
- Return a company with the specified ID.

3. `GET /companies/:companyId/users`
- Authentication required. 
- Return all users within a specified company.

4. `GET /companies/:companyId/vacancies`
- Authentication required. 
- Return all job vacancies posted by a specified company.

5. `POST /companies/:companyId/vacancies`
- Authentication required.
- Authorization required (User role must be 'admin').
- Create a job vacancy within a specified company.
- Return a Vacancy.
- Required fields: title, description, expiredAt.
- Sample request body: 
    ```bash
    {
        "title": "Frontend Developer",
        "description": "Frontend development",
        "expiredAt": "2021-10-10T10:36:40.791Z"
    }
    ```

6. `PATCH /companies/:companyId/vacancies/:vacancyId`
- Authentication required.
- Authorization required (User role must be 'admin').
- Update a specified job vacancy within a specified company.
- All fields are optional.
- Return a Vacancy.
- Sample request body: 
    ```bash
    {
        "title": "Web Developer",
        "description": "Web development"
    }
    ```

6. `DELETE /companies/:companyId/vacancies/:vacancyId`
- Authentication required.
- Authorization required (User role must be 'admin').
- Return a Vacancy.
- Delete a specified job vacancy within a specified company.

7. `POST /companies`
- Authentication required.
- Create a company.
- Required fields: name, address.
- Return a company.
- Sample request body: 
    ```bash
    {
        "name": "Google",
        "address": "Pyrmont"
    }
    ```
