import { HttpService, Injectable } from '@nestjs/common';
import { Vacancy } from '../models/vacancy.model';

@Injectable()
export class VacanciesService {
  constructor(private readonly httpService: HttpService) {}

  async findAll(): Promise<Vacancy[]> {
    const { data } = await this.httpService.get('/vacancies').toPromise();
    return data;
  }

  async findById(id: string): Promise<Vacancy> {
    const { data } = await this.httpService.get(`/vacancies/${id}`).toPromise();
    return data;
  }
}
