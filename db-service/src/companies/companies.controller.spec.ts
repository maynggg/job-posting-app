import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseModule } from '../database/database.module';
import { UsersModule } from '../users/users.module';
import { VacanciesModule } from '../vacancies/vacancies.module';
import { CompaniesController } from './companies.controller';
import { CompaniesService } from './companies.service';
import { companiesProviders } from './companies.providers';

describe('CompaniesController', () => {
  let controller: CompaniesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule, UsersModule, VacanciesModule],
      controllers: [CompaniesController],
      providers: [CompaniesService, ...companiesProviders],
    }).compile();

    controller = module.get<CompaniesController>(CompaniesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
