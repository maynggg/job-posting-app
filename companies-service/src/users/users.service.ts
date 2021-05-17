import { HttpService, Injectable } from '@nestjs/common';
import { User } from './user.interface';

const BASE_URL = process.env.USERS_SERVICE_URL
  ? `${process.env.USERS_SERVICE_URL}:${process.env.USERS_SERVICE_PORT}`
  : 'http://localhost:3002';

@Injectable()
export class UsersService {
  constructor(private readonly httpService: HttpService) {}

  async getMyInfo(): Promise<User> {
    const { data } = await this.httpService
      .get(`${BASE_URL}/users/me`)
      .toPromise();
    return data;
  }
}
