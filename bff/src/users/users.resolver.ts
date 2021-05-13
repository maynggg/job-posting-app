import {
  Resolver,
  Query,
  ResolveField,
  Parent,
  Args,
  Mutation,
} from '@nestjs/graphql';
import { Injectable } from '@nestjs/common';
import { User } from '../models/user.model';
import { UsersService } from './users.service';
import { CompaniesService } from '../companies/companies.service';
import { AccessToken } from '../models/accessToken.model';
import { LoginArgs } from './dto/login.args';
import { SignupArgs } from './dto/signup.args';

@Injectable()
@Resolver(() => User)
export class UsersResolver {
  constructor(
    private readonly usersService: UsersService,
    private readonly companiesService: CompaniesService,
  ) {}

  @Query(() => User)
  async user(@Args('id', { type: () => String }) id: string) {
    return this.usersService.findById(id);
  }

  @Query(() => User)
  async me() {
    return this.usersService.findMe();
  }

  @Query(() => [User])
  async users() {
    return this.usersService.findAll();
  }

  @ResolveField()
  async company(@Parent() user: User) {
    return this.companiesService.findById(user.companyId);
  }

  @Mutation(() => AccessToken)
  async login(@Args() loginArgs: LoginArgs) {
    return this.usersService.login(loginArgs);
  }

  @Mutation(() => User)
  async signup(@Args() signupArgs: SignupArgs) {
    return this.usersService.signup(signupArgs);
  }
}
