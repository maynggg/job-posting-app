import { HttpModule, Module, forwardRef } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompaniesResolver } from './companies.resolver';
import { UsersModule } from 'src/users/users.module';
import { VacanciesModule } from 'src/vacancies/vacancies.module';

@Module({
  imports: [
    HttpModule,
    forwardRef(() => UsersModule),
    forwardRef(() => VacanciesModule),
  ],
  providers: [CompaniesResolver, CompaniesService],
  exports: [CompaniesService],
})
export class CompaniesModule {}
