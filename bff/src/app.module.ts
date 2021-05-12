import {
  Module,
  RequestMethod,
  MiddlewareConsumer,
  HttpModule,
} from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { join } from 'path';
import { BearerMiddleware } from './bearer.middleware';
import { CompaniesModule } from './companies/companies.module';
import { UsersModule } from './users/users.module';
import { VacanciesModule } from './vacancies/vacancies.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      debug: false,
    }),
    CompaniesModule,
    UsersModule,
    VacanciesModule,
    HttpModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(BearerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
