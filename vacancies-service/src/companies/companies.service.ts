import { HttpService, Injectable } from '@nestjs/common';
import { Company } from './company.interface';

const BASE_URL = process.env.COMPANIES_SERVICE_URL
  ? `${process.env.COMPANIES_SERVICE_URL}:${process.env.COMPANIES_SERVICE_PORT}`
  : 'http://localhost:3003';

@Injectable()
export class CompaniesService {
  constructor(private readonly httpService: HttpService) {}

  async findById(id: string): Promise<Company> {
    const { data } = await this.httpService
      .get(`${BASE_URL}/companies/${id}`)
      .toPromise();
    return data;
  }
}
