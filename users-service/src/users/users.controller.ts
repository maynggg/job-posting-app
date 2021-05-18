import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Request,
  Query,
  HttpStatus,
} from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions/http.exception';

import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from './schemas/user.schema';

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
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    const accessToken: string = this.usersService.createAuthToken(user);

    return {
      accessToken,
    };
  }

  @Get()
  async findUsers(@Query() query): Promise<User[]> {
    return this.usersService.findAll(query);
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<User> {
    return this.usersService.findById(id);
  }
}
