import { HttpService, Injectable } from '@nestjs/common';
import { Company } from '../models/company.model';
import { CreateCompanyArgs } from './dto/create-company.args';

const BASE_URL = process.env.COMPANIES_SERVICE_URL
  ? `${process.env.COMPANIES_SERVICE_URL}:${process.env.COMPANIES_SERVICE_PORT}`
  : 'http://localhost:3003';

@Injectable()
export class CompaniesService {
  constructor(private readonly httpService: HttpService) {}

  async createCompany(createCompanyArgs: CreateCompanyArgs): Promise<Company> {
    const { data } = await this.httpService
      .post(`${BASE_URL}/companies`, createCompanyArgs)
      .toPromise();
    return data;
  }

  async findAll(): Promise<Company[]> {
    const { data } = await this.httpService
      .get(`${BASE_URL}/companies`)
      .toPromise();
    return data;
  }

  async findById(id: string): Promise<Company> {
    const { data } = await this.httpService
      .get(`${BASE_URL}/companies/${id}`)
      .toPromise();
    return data;
  }
}
