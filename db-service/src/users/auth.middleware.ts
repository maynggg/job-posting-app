import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { NestMiddleware, HttpStatus, Injectable } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { UsersService } from './users.service';

const JWT_SECRET = process.env.JWT_SECRET || 'THIS_IS_A_SECRET';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly usersService: UsersService) {}

  async use(req, res: Response, next: NextFunction) {
    const authHeaders = req.headers.authorization;
    try {
      if (authHeaders && (authHeaders as string).split(' ')[1]) {
        const token = (authHeaders as string).split(' ')[1];
        const payload: any = jwt.verify(token, JWT_SECRET);
        const user = await this.usersService.findById(payload.id);

        if (!user) {
          throw new HttpException('User not found.', HttpStatus.UNAUTHORIZED);
        }

        req.user = user;
        next();
      } else {
        throw new HttpException('Not authorized.', HttpStatus.UNAUTHORIZED);
      }
    } catch {
      throw new HttpException('Not authorized.', HttpStatus.UNAUTHORIZED);
    }
  }
}
