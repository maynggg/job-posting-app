import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { VacanciesService } from './vacancies.service';
import { VacanciesController } from './vacancies.controller';
import { vacanciesProviders } from './vacancies.providers';
import { DatabaseModule } from '../database/database.module';
import { AuthMiddleware } from '../users/auth.middleware';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [DatabaseModule, UsersModule],
  controllers: [VacanciesController],
  providers: [VacanciesService, ...vacanciesProviders],
  exports: [VacanciesService],
})
export class VacanciesModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: 'vacancies*', method: RequestMethod.ALL });
  }
}
