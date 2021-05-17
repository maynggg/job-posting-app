import { HttpService, Injectable } from '@nestjs/common';
import { CreateVacancyArgs } from './dto/create-vacancy.args';
import { UpdateVacancyArgs } from './dto/update-vacancy.args';
import { Vacancy } from '../models/vacancy.model';

const BASE_URL = process.env.VACANCIES_SERVICE_URL
  ? `${process.env.VACANCIES_SERVICE_URL}:${process.env.VACANCIES_SERVICE_PORT}`
  : 'http://localhost:3001';

@Injectable()
export class VacanciesService {
  constructor(private readonly httpService: HttpService) {}

  async findAll(): Promise<Vacancy[]> {
    const { data } = await this.httpService
      .get(`${BASE_URL}/vacancies`)
      .toPromise();
    return data;
  }

  async findById(id: string): Promise<Vacancy> {
    const { data } = await this.httpService
      .get(`${BASE_URL}/vacancies/${id}`)
      .toPromise();
    return data;
  }

  async findByCompanyId(companyId: string): Promise<Vacancy[]> {
    const { data } = await this.httpService
      .get(`${BASE_URL}/vacancies?companyId=${companyId}`)
      .toPromise();
    return data;
  }

  async createVacancy(createVacancyArgs: CreateVacancyArgs): Promise<Vacancy> {
    const { data } = await this.httpService
      .post(`${BASE_URL}/vacancies`, createVacancyArgs)
      .toPromise();
    return data;
  }

  async updateVacancy(
    id: string,
    updateVacancyArgs: UpdateVacancyArgs,
  ): Promise<Vacancy> {
    const { data } = await this.httpService
      .patch(`${BASE_URL}/vacancies/${id}`, updateVacancyArgs)
      .toPromise();
    return data;
  }

  async deleteVacancy(id: string): Promise<Vacancy> {
    const { data } = await this.httpService
      .delete(`${BASE_URL}/vacancies/${id}`)
      .toPromise();
    return data;
  }
}
