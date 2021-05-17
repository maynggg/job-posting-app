/* eslint-disable @typescript-eslint/no-var-requires */
import { Controller, Post, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { createPasswordHash, createPasswordSalt } from './password';

const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return 'Hello World!';
  }

  @Post('seed')
  async generateSeedDB() {
    const client = await MongoClient.connect(
      process.env.MONGO_URI || 'mongodb://localhost',
    );
    let db = client.db('jobPostingApp');
    await db.dropDatabase();

    db = client.db('jobPostingApp');

    const companyCollection = db.collection('companies');
    const userCollection = db.collection('users');
    const vacancyCollection = db.collection('vacancies');

    await companyCollection.insertMany([
      {
        _id: ObjectID('5e5df7fc6953acd3dc50fe8f'),
        name: 'PredictiveHire',
        address: '15 Newton St',
      },
      {
        _id: ObjectID('5e5df7fc6953acd3dc50fe8a'),
        name: 'Canva',
        address: 'Surry Hills',
      },
    ]);

    const users = [
      {
        _id: ObjectID('5e5df7f450571fb3aecdcf21'),
        companyId: ObjectID('5e5df7fc6953acd3dc50fe8f'),
        name: 'Bob Markle',
        username: 'bob',
        password: 'bob',
        role: 'user',
        passwordHash: '',
        passwordSalt: '',
      },
      {
        _id: ObjectID('5e5df7f450571fb3aecdcf22'),
        companyId: ObjectID('5e5df7fc6953acd3dc50fe8f'),
        name: 'Mark Smith',
        username: 'mark',
        password: 'mark',
        role: 'admin',
        passwordHash: '',
        passwordSalt: '',
      },
      {
        _id: ObjectID('5e5df7f450571fb3aecdcf23'),
        companyId: ObjectID('5e5df7fc6953acd3dc50fe8a'),
        name: 'John Doe',
        username: 'john',
        password: 'john',
        role: 'admin',
        passwordHash: '',
        passwordSalt: '',
      },
      {
        _id: ObjectID('5e5df7f450571fb3aecdcf24'),
        companyId: ObjectID('5e5df7fc6953acd3dc50fe8a'),
        name: 'Jane Doe',
        username: 'jane',
        password: 'jane',
        role: 'user',
        passwordHash: '',
        passwordSalt: '',
      },
    ];

    for (let i = 0; i < users.length; i++) {
      const salt = createPasswordSalt();
      const hash = createPasswordHash(users[i].password, salt);

      users[i].passwordHash = hash;
      users[i].passwordSalt = salt;
      delete users[i].password;
    }

    await userCollection.insertMany(users);

    const vacancies = [
      {
        _id: ObjectID('609ce166592baf004d24e6bc'),
        companyId: '5e5df7fc6953acd3dc50fe8f',
        title: 'Frontend Developer',
        description: 'Frontend development',
        expiredAt: '2021-10-10T10:36:40.791Z',
      },
      {
        _id: ObjectID('609ce166592baf004d24e6bd'),
        companyId: '5e5df7fc6953acd3dc50fe8a',
        title: 'Backend Developer',
        description: 'Backend development',
        expiredAt: '2021-05-01T10:36:40.791Z',
      },
    ];

    await vacancyCollection.insertMany(vacancies);

    await client.close();

    return 'Seed successful';
  }
}
