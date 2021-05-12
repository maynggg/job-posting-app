import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { UsersService } from '../users/users.service';
import { VacanciesService } from '../vacancies/vacancies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { Company } from './schemas/company.schema';
import { User } from '../users/schemas/user.schema';
import { Vacancy } from '../vacancies/schemas/vacancy.schema';
import { CreateVacancyDto } from '../vacancies/dto/create-vacancy.dto';
import { UpdateVacancyDto } from '../vacancies/dto/update-vacancy.dto';
import { CompanyGuard } from '../guards/company.guard';
import { Roles } from '../guards/roles.decorator';
import { RolesGuard } from '../guards/roles.guard';

@Controller('companies')
export class CompaniesController {
  constructor(
    private readonly companiesService: CompaniesService,
    private readonly usersService: UsersService,
    private readonly vacanciesService: VacanciesService,
  ) {}

  @Get(':companyId')
  async findById(@Param('companyId') companyId: string): Promise<Company> {
    return this.companiesService.findById(companyId);
  }

  @Get(':companyId/users')
  async getCompanyUser(@Param('companyId') companyId: string): Promise<User[]> {
    return this.usersService.findByCompanyId(companyId);
  }

  @Get(':companyId/vacancies')
  async getCompanyVacancies(
    @Param('companyId') companyId: string,
  ): Promise<Vacancy[]> {
    return this.vacanciesService.findByCompanyId(companyId);
  }

  @Post(':companyId/vacancies')
  @Roles('admin')
  @UseGuards(CompanyGuard)
  @UseGuards(RolesGuard)
  async createVacancy(
    @Param('companyId') companyId: string,
    @Body() createVacancyDto: CreateVacancyDto,
  ): Promise<Vacancy> {
    return this.vacanciesService.create(companyId, createVacancyDto);
  }

  @Patch(':companyId/vacancies/:vacancyId')
  @Roles('admin')
  @UseGuards(CompanyGuard)
  @UseGuards(RolesGuard)
  updateVacancy(
    @Param('vacancyId') vacancyId: string,
    @Body() updateVacancyDto: UpdateVacancyDto,
  ): Promise<Vacancy> {
    return this.vacanciesService.update(vacancyId, updateVacancyDto);
  }

  @Delete(':companyId/vacancies/:vacancyId')
  @Roles('admin')
  @UseGuards(CompanyGuard)
  @UseGuards(RolesGuard)
  removeVacancy(@Param('vacancyId') vacancyId: string): Promise<Vacancy> {
    return this.vacanciesService.remove(vacancyId);
  }

  @Get()
  async findAll(): Promise<Company[]> {
    return this.companiesService.findAll();
  }

  @Post()
  async create(@Body() createCompanyDto: CreateCompanyDto): Promise<Company> {
    return this.companiesService.create(createCompanyDto);
  }
}
