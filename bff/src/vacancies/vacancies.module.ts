import { HttpModule, Module } from '@nestjs/common';
import { VacanciesService } from './vacancies.service';
import { VacanciesResolver } from './vacancies.resolver';
import { CompaniesModule } from '../companies/companies.module';

@Module({
  imports: [HttpModule, CompaniesModule],
  providers: [VacanciesResolver, VacanciesService],
  exports: [VacanciesService],
})
export class VacanciesModule {}
