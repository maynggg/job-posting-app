import { HttpModule } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CompaniesResolver } from './companies.resolver';
import { CompaniesService } from './companies.service';

describe('CompaniesResolver', () => {
  let resolver: CompaniesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [CompaniesResolver, CompaniesService],
    }).compile();

    resolver = module.get<CompaniesResolver>(CompaniesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
