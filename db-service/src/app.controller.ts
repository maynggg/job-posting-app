/* eslint-disable @typescript-eslint/no-var-requires */
import { Controller, Post, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { createPasswordHash, createPasswordSalt } from './users/password';

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
    const client = await MongoClient.connect(process.env.MONGO_URI);
    let db = client.db('jobPostingApp');
    await db.dropDatabase();

    db = client.db('jobPostingApp');

    const companyCollection = db.collection('companies');
    const userCollection = db.collection('users');

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
    }

    await userCollection.insertMany(users);

    await client.close();

    return 'Seed successful';
  }
}
