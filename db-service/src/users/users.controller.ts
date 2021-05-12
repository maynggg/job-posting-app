import { Controller, Get, Post, Body, Param, Request } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions/http.exception';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from './interfaces/user.interface';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/signup')
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.create(createUserDto);
  }

  @Get('/me')
  async getMyInfo(@Request() req): Promise<User> {
    return req.user;
  }

  @Post('/login')
  async login(@Body() loginUserDto: LoginUserDto) {
    const user: User = await this.usersService.checkLoginDetail(loginUserDto);
    if (!user) {
      const errors = { message: 'User not found' };
      throw new HttpException({ errors }, 401);
    }

    const accessToken: string = this.usersService.createAuthToken(user);

    return {
      accessToken,
      user,
    };
  }

  @Get()
  async findUsers(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<User> {
    return this.usersService.findById(id);
  }
}
