import { HttpModule, Module, forwardRef } from '@nestjs/common';
import { VacanciesService } from './vacancies.service';
import { VacanciesResolver } from './vacancies.resolver';
import { CompaniesModule } from '../companies/companies.module';

@Module({
  imports: [HttpModule, forwardRef(() => CompaniesModule)],
  providers: [VacanciesResolver, VacanciesService],
  exports: [VacanciesService],
})
export class VacanciesModule {}
