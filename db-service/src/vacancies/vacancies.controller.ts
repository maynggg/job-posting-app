import { Controller, Get, Param } from '@nestjs/common';
import { VacanciesService } from './vacancies.service';
import { Vacancy } from './interfaces/vacancy.interface';

@Controller('vacancies')
export class VacanciesController {
  constructor(private readonly vacanciesService: VacanciesService) {}

  @Get()
  async findAll(): Promise<Vacancy[]> {
    return this.vacanciesService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Vacancy> {
    return this.vacanciesService.findById(id);
  }
}
