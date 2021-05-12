import { Test, TestingModule } from '@nestjs/testing';
import { VacanciesService } from './vacancies.service';
import { vacanciesProviders } from './vacancies.providers';
import { DatabaseModule } from 'src/database/database.module';

describe('VacanciesService', () => {
  let service: VacanciesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [DatabaseModule],
      providers: [VacanciesService, ...vacanciesProviders],
    }).compile();

    service = module.get<VacanciesService>(VacanciesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
