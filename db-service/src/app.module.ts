import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CompaniesModule } from './companies/companies.module';
import { VacanciesModule } from './vacancies/vacancies.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb://localhost/nest'),
    UsersModule,
    CompaniesModule,
    VacanciesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
