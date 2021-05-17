import { HttpService, Injectable } from '@nestjs/common';
import { AccessToken } from '../models/accessToken.model';
import { User } from '../models/user.model';
import { LoginArgs } from './dto/login.args';
import { SignupArgs } from './dto/signup.args';

const BASE_URL = process.env.USERS_SERVICE_URL
  ? `${process.env.USERS_SERVICE_URL}:${process.env.USERS_SERVICE_PORT}`
  : 'http://localhost:3002';

@Injectable()
export class UsersService {
  constructor(private readonly httpService: HttpService) {}

  async findAll(): Promise<User[]> {
    const { data } = await this.httpService
      .get(`${BASE_URL}/users`)
      .toPromise();
    return data;
  }

  async findById(id: string): Promise<User> {
    const { data } = await this.httpService
      .get(`${BASE_URL}/users/${id}`)
      .toPromise();
    return data;
  }

  async findMe(): Promise<User> {
    const { data } = await this.httpService
      .get(`${BASE_URL}/users/me`)
      .toPromise();
    return data;
  }

  async login(loginArgs: LoginArgs): Promise<AccessToken> {
    const { data } = await this.httpService
      .post(`${BASE_URL}/users/login`, loginArgs)
      .toPromise();
    return data;
  }

  async signup(signupArgs: SignupArgs): Promise<User> {
    const { data } = await this.httpService
      .post(`${BASE_URL}/users/signup`, signupArgs)
      .toPromise();
    return data;
  }

  async findByCompanyId(companyId: string): Promise<User[]> {
    const { data } = await this.httpService
      .get(`${BASE_URL}/users?companyId=${companyId}`)
      .toPromise();
    return data;
  }
}
