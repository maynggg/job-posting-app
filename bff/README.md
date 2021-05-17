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

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository for the BFF microservices.

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
Open `http://<BFF_BASE_URL>:<BFF_PORT>/graphql` to test API locally.

### Authentication Header
`Authorization: Bearer [your JWT here]`

### Documentation
Open `schema_doc/index.html` to see the full GraphQL Schema documentation.

### Sample request body
#### Users
  ```bash
  query {
    users {
      _id,
      name,
      username,
      role,
      company {
        _id,
        name,
        address
      }
    }
  }
  ```

  ```bash
  mutation {
    login(username: "bob", password: "bob") {
      accessToken
    }
  }
  ```

#### Companies
  ```bash
  query {
    companies {
      _id,
      name,
      address,
      users {
        _id,
        name,
        username,
        role
      },
      vacancies {
        _id,
        title,
        description,
        expiredAt
      }
    }
  }
  ```

  ```bash
  mutation {
    createCompany(name: "PredictiveHire", address: "15 Newton St") {
      _id,
      name,
      address
    }
  }
  ```

#### Vacancies
  ```bash
  query {
    vacancies {
       _id,
      title,
      description,
      expiredAt,
      company {
        _id,
        name,
        address
      }
    }
  }
  ```

  ```bash
  mutation {
    createVacancy(companyId: "6094e318328e51e47adbfe27", title: "Mobile developer", description: "Mobile developer description", expiredAt: "2021-05-31T10:36:40.791Z") {
    _id,
    title,
    description,
    expiredAt,
    company {
      _id,
      name,
      address
    }
    }
  }
  ```