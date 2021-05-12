import { Injectable, NestMiddleware, HttpService } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class BearerMiddleware implements NestMiddleware {
  constructor(private httpService: HttpService) {}
  use(req: Request, res: Response, next: NextFunction) {
    this.httpService.axiosRef.defaults.headers.common['authorization'] =
      req.headers.authorization;
    this.httpService.axiosRef.defaults.baseURL = process.env.DB_SERVICE_BASE_URL
      ? `${process.env.DB_SERVICE_BASE_URL}:${process.env.DB_SERVICE_PORT}`
      : 'http://localhost:3001';
    next();
  }
}
