import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { CompaniesController } from './companies.controller';
import { companiesProviders } from './companies.providers';
import { DatabaseModule } from '../database/database.module';
import { CompaniesService } from './companies.service';
import { AuthMiddleware } from '../users/auth.middleware';
import { UsersModule } from '../users/users.module';
import { VacanciesModule } from '../vacancies/vacancies.module';

@Module({
  imports: [DatabaseModule, UsersModule, VacanciesModule],
  controllers: [CompaniesController],
  providers: [CompaniesService, ...companiesProviders],
})
export class CompaniesModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: 'companies*', method: RequestMethod.ALL });
  }
}
