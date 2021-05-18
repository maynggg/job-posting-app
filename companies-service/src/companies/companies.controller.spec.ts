import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Company } from './schemas/company.schema';
import { CompaniesController } from './companies.controller';
import { CompaniesService } from './companies.service';

describe('CompaniesController', () => {
  let controller: CompaniesController;
  let service: CompaniesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompaniesController],
      providers: [
        CompaniesService,
        {
          provide: getModelToken(Company.name),
          useValue: null,
        },
      ],
    }).compile();

    controller = module.get<CompaniesController>(CompaniesController);
    service = module.get<CompaniesService>(CompaniesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of companies', async () => {
      const company = {
        id: 'id',
        name: 'name',
        address: 'address',
      };
      const result = [company];

      const spy = jest
        .spyOn(service, 'findAll')
        .mockReturnValueOnce(result as any);

      expect(await controller.findAll()).toBe(result);
      expect(spy).toBeCalled();
    });
  });

  describe('findById', () => {
    it('should return a company with the specified id', async () => {
      const company = {
        id: '6094e318328e51e47adbfe28',
        name: 'name',
        address: 'address',
      };

      const companyId = '6094e318328e51e47adbfe28';

      const spy = jest
        .spyOn(service, 'findById')
        .mockReturnValueOnce(company as any);

      expect(await controller.findById(companyId)).toBe(company);
      expect(spy).toBeCalledWith(companyId);
    });
  });

  describe('create', () => {
    it('should return a company', async () => {
      const req = {
        name: 'name',
        address: 'address',
      };

      const res = {
        _id: 'id',
        name: 'name',
        address: 'address',
      };

      const spy = jest.spyOn(service, 'create').mockReturnValueOnce(res as any);
      expect(await controller.create(req)).toBe(res);
      expect(spy).toBeCalledWith(req);
    });
  });
});
