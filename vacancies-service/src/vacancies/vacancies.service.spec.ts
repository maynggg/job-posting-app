import { Test, TestingModule } from '@nestjs/testing';
import { VacanciesService } from './vacancies.service';
import { Vacancy, VacancyDocument } from './schemas/vacancy.schema';
import { UpdateVacancyDto } from './dto/update-vacancy.dto';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';

describe('VacanciesService', () => {
  let service: VacanciesService;
  let mockVacancyModel: Model<VacancyDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VacanciesService,
        {
          provide: getModelToken(Vacancy.name),
          useValue: Model,
        },
      ],
    }).compile();

    service = module.get<VacanciesService>(VacanciesService);
    mockVacancyModel = module.get<Model<VacancyDocument>>(
      getModelToken(Vacancy.name),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findById', () => {
    it('should return a vacancy with the same ID', async () => {
      const vacancy = new Vacancy();
      const vacancyId = '12345';
      const spy = jest
        .spyOn(mockVacancyModel, 'findById')
        .mockResolvedValue(vacancy as VacancyDocument);

      expect(await service.findById(vacancyId)).toBe(vacancy);
      expect(spy).toBeCalledWith(vacancyId);
    });
  });

  describe('findAll', () => {
    it('should return all vacancies', async () => {
      const vacancies = [new Vacancy()];
      const spy = jest
        .spyOn(mockVacancyModel, 'find')
        .mockResolvedValue(vacancies as VacancyDocument[]);

      expect(await service.findAll()).toBe(vacancies);
      expect(spy).toBeCalled();
    });
  });

  describe('remove', () => {
    it('should remove a vacancy with the same ID', async () => {
      const deletedVacancy = new Vacancy();
      const vacancyId = '12345';

      const spy = jest
        .spyOn(mockVacancyModel, 'findByIdAndDelete')
        .mockResolvedValue(deletedVacancy as VacancyDocument);

      expect(await service.remove(vacancyId)).toBe(deletedVacancy);
      expect(spy).toBeCalledWith(vacancyId);
    });
  });

  describe('update', () => {
    it('should update a vacancy with the same ID', async () => {
      const updatedVacancy = new Vacancy();
      const vacancyId = '12345';
      const updateDto: UpdateVacancyDto = {
        title: 'title',
        description: 'description',
        expiredAt: new Date(),
      };

      const findById = jest
        .spyOn(mockVacancyModel, 'findById')
        .mockResolvedValue(updatedVacancy as VacancyDocument);

      const findOneAndUpdate = jest
        .spyOn(mockVacancyModel, 'findOneAndUpdate')
        .mockResolvedValue(updatedVacancy as VacancyDocument);

      expect(await service.update(vacancyId, updateDto)).toBe(updatedVacancy);
      expect(findById).toBeCalledWith(vacancyId);
      expect(findOneAndUpdate).toBeCalled();
    });
  });

  describe('findByCompanyId', () => {
    it('should find all vacancies of a company', async () => {
      const vacancies = [new Vacancy()];
      const companyId = '5e5df7fc6953acd3dc50fe8f';
      const spy = jest
        .spyOn(mockVacancyModel, 'find')
        .mockResolvedValue(vacancies as VacancyDocument[]);

      expect(await service.findByCompanyId(companyId)).toBe(vacancies);
      expect(spy).toBeCalled();
    });
  });
});
