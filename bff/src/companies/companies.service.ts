import { HttpService, Injectable } from '@nestjs/common';
import { Company } from '../models/company.model';
import { User } from '../models/user.model';
import { Vacancy } from '../models/vacancy.model';
import { CreateCompanyArgs } from './dto/create-company.args';
import { CreateVacancyArgs } from './dto/create-vacancy.args';
import { UpdateVacancyArgs } from './dto/update-vacancy.args';

@Injectable()
export class CompaniesService {
  constructor(private readonly httpService: HttpService) {}

  async createCompany(
    createCompanyArgs: CreateCompanyArgs,
  ): Promise<Company> {
    const { data } = await this.httpService
      .post(`/companies/`, createCompanyArgs)
      .toPromise();
    return data;
  }

  async findAll(): Promise<Company[]> {
    const { data } = await this.httpService.get('/companies').toPromise();
    return data;
  }

  async findById(id: string): Promise<Company> {
    const { data } = await this.httpService.get(`/companies/${id}`).toPromise();
    return data;
  }

  async getUsers(id: string): Promise<User[]> {
    const { data } = await this.httpService
      .get(`/companies/${id}/users`)
      .toPromise();
    return data;
  }

  async getVacancies(id: string): Promise<Vacancy[]> {
    const { data } = await this.httpService
      .get(`/companies/${id}/vacancies`)
      .toPromise();
    return data;
  }

  async createVacancy(
    companyId: string,
    createVacancyArgs: CreateVacancyArgs,
  ): Promise<Vacancy> {
    const { data } = await this.httpService
      .post(`/companies/${companyId}/vacancies`, createVacancyArgs)
      .toPromise();
    return data;
  }

  async updateVacancy(
    companyId: string,
    vacancyId: string,
    updateVacancyArgs: UpdateVacancyArgs,
  ): Promise<Vacancy> {
    const { data } = await this.httpService
      .patch(
        `/companies/${companyId}/vacancies/${vacancyId}`,
        updateVacancyArgs,
      )
      .toPromise();
    return data;
  }

  async deleteVacancy(companyId: string, vacancyId: string): Promise<Vacancy> {
    const { data } = await this.httpService
      .delete(`/companies/${companyId}/vacancies/${vacancyId}`)
      .toPromise();
    return data;
  }
}
