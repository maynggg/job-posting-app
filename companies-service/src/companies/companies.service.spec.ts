import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesService } from './companies.service';
import { Company, CompanyDocument } from './schemas/company.schema';
import { Model } from 'mongoose';

describe('CompaniesService', () => {
  let service: CompaniesService;
  let mockCompanyModel: Model<CompanyDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompaniesService,
        {
          provide: getModelToken(Company.name),
          useValue: Model,
        },
      ],
    }).compile();

    service = module.get<CompaniesService>(CompaniesService);
    mockCompanyModel = module.get<Model<CompanyDocument>>(
      getModelToken(Company.name),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findById', () => {
    it('should return a company with the specified ID', async () => {
      const company = new Company();
      const companyId = '12345';
      const spy = jest
        .spyOn(mockCompanyModel, 'findById')
        .mockResolvedValue(company as CompanyDocument);

      expect(await service.findById(companyId)).toBe(company);
      expect(spy).toBeCalledWith(companyId);
    });
  });

  describe('findAll', () => {
    it('should return all companies', async () => {
      const companies = [new Company()];
      const spy = jest
        .spyOn(mockCompanyModel, 'find')
        .mockResolvedValue(companies as CompanyDocument[]);

      expect(await service.findAll()).toBe(companies);
      expect(spy).toBeCalled();
    });
  });
});
