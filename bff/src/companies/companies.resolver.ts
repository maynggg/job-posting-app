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
import { CreateCompanyArgs } from './dto/create-company.args';
import { UsersService } from '../users/users.service';
import { VacanciesService } from '../vacancies/vacancies.service';

@Injectable()
@Resolver(() => Company)
export class CompaniesResolver {
  constructor(
    private readonly companiesService: CompaniesService,
    private readonly usersService: UsersService,
    private readonly vacanciesService: VacanciesService,
  ) {}

  @Mutation(() => Company)
  async createCompany(@Args() createCompanyArgs: CreateCompanyArgs) {
    return this.companiesService.createCompany(createCompanyArgs);
  }

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
    return this.usersService.findByCompanyId(company._id);
  }

  @ResolveField()
  async vacancies(@Parent() company: Company) {
    return this.vacanciesService.findByCompanyId(company._id);
  }
}
