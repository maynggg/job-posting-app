import {
  HttpModule,
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { CompaniesController } from './companies.controller';
import { CompaniesService } from './companies.service';
import { BearerMiddleware } from '../users/bearer.middleware';
import { UsersModule } from '../users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Company, CompanySchema } from './schemas/company.schema';
import { AuthMiddleware } from 'src/users/auth.middleware';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([{ name: Company.name, schema: CompanySchema }]),
    UsersModule,
  ],
  controllers: [CompaniesController],
  providers: [CompaniesService],
})
export class CompaniesModule implements NestModule {
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(BearerMiddleware, AuthMiddleware)
      .forRoutes({ path: 'companies*', method: RequestMethod.ALL });
  }
}
