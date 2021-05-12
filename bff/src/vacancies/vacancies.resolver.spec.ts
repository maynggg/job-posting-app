import { HttpModule } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesModule } from '../companies/companies.module';
import { VacanciesResolver } from './vacancies.resolver';
import { VacanciesService } from './vacancies.service';

describe('VacanciesResolver', () => {
  let resolver: VacanciesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CompaniesModule, HttpModule],
      providers: [VacanciesResolver, VacanciesService],
    }).compile();

    resolver = module.get<VacanciesResolver>(VacanciesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
