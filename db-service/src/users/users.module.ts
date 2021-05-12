import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { usersProviders } from './users.providers';
import { UsersService } from './users.service';
import { DatabaseModule } from '../database/database.module';
import { UsersController } from './users.controller';
import { AuthMiddleware } from './auth.middleware';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [UsersService, ...usersProviders],
  exports: [UsersService],
})
export class UsersModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: 'users', method: RequestMethod.GET });
  }
}
