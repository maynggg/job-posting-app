import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
  HttpModule,
} from '@nestjs/common';
import { VacanciesService } from './vacancies.service';
import { VacanciesController } from './vacancies.controller';
import { BearerMiddleware } from '../users/bearer.middleware';
import { AuthMiddleware } from '../users/auth.middleware';
import { UsersModule } from '../users/users.module';
import { Vacancy, VacancySchema } from './schemas/vacancy.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { CompaniesModule } from 'src/companies/companies.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Vacancy.name, schema: VacancySchema }]),
    UsersModule,
    CompaniesModule,
    HttpModule,
  ],
  controllers: [VacanciesController],
  providers: [VacanciesService],
  exports: [VacanciesService],
})
export class VacanciesModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(BearerMiddleware, AuthMiddleware)
      .forRoutes({ path: 'vacancies*', method: RequestMethod.ALL });
  }
}
