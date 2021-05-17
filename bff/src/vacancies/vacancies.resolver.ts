import {
  Resolver,
  Query,
  ResolveField,
  Parent,
  Args,
  Mutation,
} from '@nestjs/graphql';
import { Injectable } from '@nestjs/common';
import { Vacancy } from '../models/vacancy.model';
import { VacanciesService } from './vacancies.service';
import { CompaniesService } from '../companies/companies.service';
import { CreateVacancyArgs } from './dto/create-vacancy.args';
import { UpdateVacancyArgs } from './dto/update-vacancy.args';

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

  @Mutation(() => Vacancy)
  async createVacancy(@Args() createVacancyArgs: CreateVacancyArgs) {
    return this.vacanciesService.createVacancy(createVacancyArgs);
  }

  @Mutation(() => Vacancy)
  async updateVacancy(
    @Args('vacancyId', { type: () => String }) vacancyId: string,
    @Args() updateVacancyArgs: UpdateVacancyArgs,
  ) {
    return this.vacanciesService.updateVacancy(vacancyId, updateVacancyArgs);
  }

  @Mutation(() => Vacancy)
  async deleteVacancy(
    @Args('vacancyId', { type: () => String }) vacancyId: string,
  ) {
    return this.vacanciesService.deleteVacancy(vacancyId);
  }
}
