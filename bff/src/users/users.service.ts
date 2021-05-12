import { HttpService, Injectable } from '@nestjs/common';
import { AccessToken } from '../models/accessToken.model';
import { User } from '../models/user.model';
import { LoginArgs } from './dto/login.args';

@Injectable()
export class UsersService {
  constructor(private readonly httpService: HttpService) {}

  async findAll(): Promise<User[]> {
    const { data } = await this.httpService.get('/users').toPromise();
    return data;
  }

  async findById(id: string): Promise<User> {
    const { data } = await this.httpService.get(`/users/${id}`).toPromise();
    return data;
  }

  async findMe(): Promise<User> {
    const { data } = await this.httpService.get('/users/me').toPromise();
    return data;
  }

  async login(loginArgs: LoginArgs): Promise<AccessToken> {
    const { data } = await this.httpService
      .post('/users/login', loginArgs)
      .toPromise();
    return data;
  }
}
