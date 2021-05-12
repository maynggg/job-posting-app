import { Resolver, Query, ResolveField, Parent, Args } from '@nestjs/graphql';
import { Injectable } from '@nestjs/common';
import { Vacancy } from '../models/vacancy.model';
import { VacanciesService } from './vacancies.service';
import { CompaniesService } from '../companies/companies.service';

@Injectable()
@Resolver(() => Vacancy)
export class VacanciesResolver {
  constructor(
    private readonly vacanciesService: VacanciesService,
    private readonly companiesService: CompaniesService,
  ) {}

  @Query(() => Vacancy)
  async vacancy(@Args('id', { type: () => String }) id: string) {
    return this.vacanciesService.findById(id);
  }

  @Query(() => [Vacancy])
  async vacancies() {
    return this.vacanciesService.findAll();
  }

  @ResolveField()
  async company(@Parent() vacancy: Vacancy) {
    return this.companiesService.findById(vacancy.companyId);
  }
}
