import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';

import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';

import * as jwt from 'jsonwebtoken';
import * as pw from './password';
import * as mongoose from 'mongoose';

const JWT_SECRET = process.env.JWT_SECRET || 'THIS_IS_A_SECRET';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { companyId, name, username, password, role } = createUserDto;
    // Check if this username has been used
    const user = await this.userModel.findOne({
      username: username,
    });
    if (user) {
      const errors = { username: 'Username must be unique.' };
      throw new HttpException(
        { message: 'Input data validation failed', errors },
        HttpStatus.BAD_REQUEST,
      );
    }

    // Create password hash and salt
    const passwordSalt = pw.createPasswordSalt();
    const passwordHash = pw.createPasswordHash(password, passwordSalt);

    const createdUser = new this.userModel({
      companyId,
      name,
      username,
      passwordHash,
      passwordSalt,
      role,
    });

    return createdUser.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findByCompanyId(companyId: string): Promise<User[]> {
    const query: any = { companyId: new mongoose.Types.ObjectId(companyId) };
    return await this.userModel.find(query).exec();
  }

  async findById(id: string): Promise<User> {
    return this.userModel.findById(id).exec();
  }

  async checkLoginDetail(loginUserDto: LoginUserDto): Promise<User> {
    const { username, password } = loginUserDto;

    const user = await this.userModel.findOne({
      username: username,
    });

    if (!user) {
      return null;
    }

    const passwordHash = pw.createPasswordHash(password, user.passwordSalt);

    if (passwordHash !== user.passwordHash) {
      const errors = { User: 'Wrong email or password.' };
      throw new HttpException({ errors }, 401);
    }

    return user;
  }

  createAuthToken(user: User): string {
    const payload = {
      id: user._id,
    };
    const token = jwt.sign(payload, JWT_SECRET);
    return token;
  }
}
