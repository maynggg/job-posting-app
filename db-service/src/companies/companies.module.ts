import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { CompaniesController } from './companies.controller';
import { CompaniesService } from './companies.service';
import { AuthMiddleware } from '../users/auth.middleware';
import { UsersModule } from '../users/users.module';
import { VacanciesModule } from '../vacancies/vacancies.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Company, CompanySchema } from './schemas/company.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Company.name, schema: CompanySchema }]),
    UsersModule,
    VacanciesModule,
  ],
  controllers: [CompaniesController],
  providers: [CompaniesService],
})
export class CompaniesModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: 'companies*', method: RequestMethod.ALL });
  }
}
