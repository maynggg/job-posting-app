import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { VacanciesController } from './vacancies.controller';
import { VacanciesService } from './vacancies.service';
import { Vacancy } from './schemas/vacancy.schema';

describe('VacanciesController', () => {
  let controller: VacanciesController;
  let service: VacanciesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VacanciesController],
      providers: [
        VacanciesService,
        {
          provide: getModelToken(Vacancy.name),
          useValue: null,
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

      const vacancyId = '12345';

      service.findById = jest.fn().mockResolvedValueOnce(vacancy);
      expect(await controller.findById(vacancyId)).toBe(vacancy);
      expect(service.findById).toBeCalledWith(vacancyId);
    });
  });
});
