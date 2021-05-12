import { Test, TestingModule } from '@nestjs/testing';
import { VacanciesController } from './vacancies.controller';
import { VacanciesService } from './vacancies.service';

class VacancyProviderFake {}

describe('VacanciesController', () => {
  let controller: VacanciesController;
  let service: VacanciesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VacanciesController],
      providers: [
        VacanciesService,
        {
          provide: 'VACANCY_MODEL',
          useClass: VacancyProviderFake,
        },
      ],
    }).compile();

    controller = module.get<VacanciesController>(VacanciesController);
    service = module.get<VacanciesService>(VacanciesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of vacancies', async () => {
      const vacancy = {
        companyId: 'id',
        title: 'title',
        description: 'description',
        expiredAt: new Date(),
      };
      const result = [vacancy];

      service.findAll = jest.fn().mockResolvedValueOnce(result);
      expect(await controller.findAll()).toBe(result);
    });
  });

  describe('findById', () => {
    it('should return a vacancy', async () => {
      const vacancy = {
        companyId: 'id',
        title: 'title',
        description: 'description',
        expiredAt: new Date(),
      };

      service.findById = jest.fn().mockResolvedValueOnce(vacancy);
      expect(await controller.findById('id')).toBe(vacancy);
    });
  });
});
