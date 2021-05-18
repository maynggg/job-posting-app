import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { VacanciesController } from './vacancies.controller';
import { VacanciesService } from './vacancies.service';
import { Vacancy } from './schemas/vacancy.schema';
import { CompaniesModule } from '../companies/companies.module';
import { CompaniesService } from '../companies/companies.service';

describe('VacanciesController', () => {
  let controller: VacanciesController;
  let vacanciesService: VacanciesService;
  let companiesService: CompaniesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CompaniesModule],
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
    vacanciesService = module.get<VacanciesService>(VacanciesService);
    companiesService = module.get<CompaniesService>(CompaniesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of vacancies', async () => {
      const vacancy = {
        companyId: '6094e318328e51e47adbfe28',
        title: 'title',
        description: 'description',
        expiredAt: new Date(),
      };
      const result = [vacancy];

      const query = { companyId: '6094e318328e51e47adbfe28' };

      const spy = jest
        .spyOn(vacanciesService, 'findAll')
        .mockReturnValueOnce(result as any);

      expect(await controller.findAll(query)).toBe(result);
      expect(spy).toBeCalledWith(query);
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

      vacanciesService.findById = jest.fn().mockResolvedValueOnce(vacancy);
      expect(await controller.findById(vacancyId)).toBe(vacancy);
      expect(vacanciesService.findById).toBeCalledWith(vacancyId);
    });
  });

  describe('createVacancy', () => {
    it('should return a vacancy', async () => {
      const req = {
        user: {
          companyId: 'id',
        },
      };

      const company = {
        _id: 'id',
      };

      const createVacancyDto = {
        companyId: 'id',
        title: 'title',
        description: 'description',
        expiredAt: new Date(),
      };

      const res = {
        _id: 'id',
        companyId: 'id',
        title: 'title',
        description: 'description',
        expiredAt: new Date(),
      };

      const vacanciesServiceSpy = jest
        .spyOn(vacanciesService, 'create')
        .mockReturnValueOnce(res as any);
      const companiesServiceSpy = jest
        .spyOn(companiesService, 'findById')
        .mockReturnValueOnce(company as any);

      expect(await controller.createVacancy(createVacancyDto, req)).toBe(res);
      expect(vacanciesServiceSpy).toBeCalledWith(createVacancyDto);
      expect(companiesServiceSpy).toBeCalledWith('id');
    });

    it('should throw forbidden error if the user does not have access to that company', async () => {
      const req = {
        user: {
          companyId: 'id',
        },
      };

      const company = {
        _id: 'id',
      };

      const createVacancyDto = {
        companyId: 'anotherId',
        title: 'title',
        description: 'description',
        expiredAt: new Date(),
      };

      jest
        .spyOn(companiesService, 'findById')
        .mockReturnValueOnce(company as any);

      try {
        await controller.createVacancy(createVacancyDto, req);
      } catch (error) {
        expect(error.status).toBe(403);
      }
    });

    it('should throw not found error if the company does not exist', async () => {
      const req = {
        user: {
          companyId: 'id',
        },
      };

      const company = undefined;

      const createVacancyDto = {
        companyId: 'id',
        title: 'title',
        description: 'description',
        expiredAt: new Date(),
      };

      jest
        .spyOn(companiesService, 'findById')
        .mockReturnValueOnce(company as any);

      try {
        await controller.createVacancy(createVacancyDto, req);
      } catch (error) {
        expect(error.status).toBe(404);
      }
    });
  });

  describe('updateVacancy', () => {
    it('should return a vacancy', async () => {
      const vacancyId = 'vacancyId';

      const req = {
        user: {
          companyId: 'id',
        },
      };

      const vacancy = {
        companyId: 'id',
      };

      const updateVacancyDto = {
        title: 'title',
        description: 'description',
        expiredAt: new Date(),
      };

      const res = {
        _id: 'id',
        companyId: 'id',
        title: 'title',
        description: 'description',
        expiredAt: new Date(),
      };

      const findByIdSpy = jest
        .spyOn(vacanciesService, 'findById')
        .mockReturnValueOnce(vacancy as any);

      const updateSpy = jest
        .spyOn(vacanciesService, 'update')
        .mockReturnValueOnce(res as any);

      expect(
        await controller.updateVacancy(vacancyId, updateVacancyDto, req),
      ).toBe(res);
      expect(findByIdSpy).toBeCalledWith(vacancyId);
      expect(updateSpy).toBeCalledWith(vacancyId, updateVacancyDto);
    });
  });

  it('should throw forbidden error if the user does not have access to that company', async () => {
    const vacancyId = 'vacancyId';

    const req = {
      user: {
        companyId: 'id',
      },
    };

    const vacancy = {
      _id: 'id',
      companyId: 'another id',
    };

    const updateVacancyDto = {
      title: 'title',
      description: 'description',
      expiredAt: new Date(),
    };

    jest
      .spyOn(vacanciesService, 'findById')
      .mockReturnValueOnce(vacancy as any);

    try {
      await controller.updateVacancy(vacancyId, updateVacancyDto, req);
    } catch (error) {
      expect(error.status).toBe(403);
    }
  });

  describe('removeVacancy', () => {
    it('should return a vacancy', async () => {
      const vacancyId = 'vacancyId';

      const req = {
        user: {
          companyId: 'id',
        },
      };

      const vacancy = {
        companyId: 'id',
      };

      const res = {
        _id: 'id',
        companyId: 'id',
        title: 'title',
        description: 'description',
        expiredAt: new Date(),
      };

      const findByIdSpy = jest
        .spyOn(vacanciesService, 'findById')
        .mockReturnValueOnce(vacancy as any);

      const removeSpy = jest
        .spyOn(vacanciesService, 'remove')
        .mockReturnValueOnce(res as any);

      expect(await controller.removeVacancy(vacancyId, req)).toBe(res);
      expect(findByIdSpy).toBeCalledWith(vacancyId);
      expect(removeSpy).toBeCalledWith(vacancyId);
    });
  });

  it('should throw forbidden error if the user does not have access to that company', async () => {
    const vacancyId = 'vacancyId';

    const req = {
      user: {
        companyId: 'id',
      },
    };

    const vacancy = {
      _id: 'id',
      companyId: 'another id',
    };

    jest
      .spyOn(vacanciesService, 'findById')
      .mockReturnValueOnce(vacancy as any);

    try {
      await controller.removeVacancy(vacancyId, req);
    } catch (error) {
      expect(error.status).toBe(403);
    }
  });
});
