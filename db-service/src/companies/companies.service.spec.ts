import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesService } from './companies.service';
import { companiesProviders } from './companies.providers';
import { DatabaseModule } from '../database/database.module';

describe('CompaniesService', () => {
  let service: CompaniesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      providers: [CompaniesService, ...companiesProviders],
    }).compile();

    service = module.get<CompaniesService>(CompaniesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
