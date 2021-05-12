import {
  Resolver,
  Query,
  ResolveField,
  Parent,
  Args,
  Mutation,
} from '@nestjs/graphql';
import { Injectable } from '@nestjs/common';
import { Company } from '../models/company.model';
import { CompaniesService } from './companies.service';
import { Vacancy } from '../models/vacancy.model';
import { CreateVacancyArgs } from './dto/create-vacancy.args';
import { UpdateVacancyArgs } from './dto/update-vacancy.args';

@Injectable()
@Resolver(() => Company)
export class CompaniesResolver {
  constructor(private readonly companiesService: CompaniesService) {}

  @Query(() => Company)
  async company(@Args('id', { type: () => String }) id: string) {
    return this.companiesService.findById(id);
  }

  @Query(() => [Company])
  async companies() {
    return this.companiesService.findAll();
  }

  @ResolveField()
  async users(@Parent() company: Company) {
    return this.companiesService.getUsers(company._id);
  }

  @ResolveField()
  async vacancies(@Parent() company: Company) {
    return this.companiesService.getVacancies(company._id);
  }

  @Mutation(() => Vacancy)
  async createVacancy(
    @Args('companyId', { type: () => String }) companyId: string,
    @Args() createVacancyArgs: CreateVacancyArgs,
  ) {
    return this.companiesService.createVacancy(companyId, createVacancyArgs);
  }

  @Mutation(() => Vacancy)
  async updateVacancy(
    @Args('companyId', { type: () => String }) companyId: string,
    @Args('vacancyId', { type: () => String }) vacancyId: string,
    @Args() updateVacancyArgs: UpdateVacancyArgs,
  ) {
    return this.companiesService.updateVacancy(
      companyId,
      vacancyId,
      updateVacancyArgs,
    );
  }

  @Mutation(() => Vacancy)
  async deleteVacancy(
    @Args('companyId', { type: () => String }) companyId: string,
    @Args('vacancyId', { type: () => String }) vacancyId: string,
  ) {
    return this.companiesService.deleteVacancy(companyId, vacancyId);
  }
}
