import { Injectable, NestMiddleware, HttpService } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class BearerMiddleware implements NestMiddleware {
  constructor(private httpService: HttpService) {}
  use(req: Request, res: Response, next: NextFunction) {
    this.httpService.axiosRef.defaults.headers.common['authorization'] =
      req.headers.authorization;
    next();
  }
}
