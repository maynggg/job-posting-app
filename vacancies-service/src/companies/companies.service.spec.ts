import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesService } from './companies.service';
import { HttpModule, HttpService } from '@nestjs/common';

describe('CompaniesService', () => {
  let service: CompaniesService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [CompaniesService],
    }).compile();

    service = module.get<CompaniesService>(CompaniesService);
    httpService = module.get<HttpService>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findById', () => {
    it('should return a company with the specified ID', async () => {
      const companyId = 'id';
      const company = {
        id: 'id',
        name: 'name',
        address: 'address',
      };

      const response = {
        data: company,
        headers: {},
        config: { url: 'http://localhost:3000/mockUrl' },
        status: 200,
        statusText: 'OK',
      };

      const observableObj = {
        toPromise: () => response,
      };

      const spy = jest
        .spyOn(httpService, 'get')
        .mockReturnValueOnce(observableObj as any);

      expect(await service.findById(companyId)).toBe(response.data);
      expect(spy).toBeCalled();
    });
  });
});
