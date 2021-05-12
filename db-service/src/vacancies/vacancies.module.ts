import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { VacanciesService } from './vacancies.service';
import { VacanciesController } from './vacancies.controller';
import { AuthMiddleware } from '../users/auth.middleware';
import { UsersModule } from '../users/users.module';
import { Vacancy, VacancySchema } from './schemas/vacancy.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Vacancy.name, schema: VacancySchema }]),
    UsersModule,
  ],
  controllers: [VacanciesController],
  providers: [VacanciesService],
  exports: [VacanciesService],
})
export class VacanciesModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: 'vacancies*', method: RequestMethod.ALL });
  }
}
