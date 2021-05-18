import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Request,
  Patch,
  Delete,
  Query,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { VacanciesService } from './vacancies.service';
import { Vacancy } from './schemas/vacancy.schema';
import { CreateVacancyDto } from './dto/create-vacancy.dto';
import { UpdateVacancyDto } from './dto/update-vacancy.dto';
import { Roles } from '../guards/roles.decorator';
import { RolesGuard } from '../guards/roles.guard';
import { CompaniesService } from '../companies/companies.service';

@Controller('vacancies')
export class VacanciesController {
  constructor(
    private readonly vacanciesService: VacanciesService,
    private readonly companiesService: CompaniesService,
  ) {}

  @Get()
  async findAll(@Query() query): Promise<Vacancy[]> {
    return this.vacanciesService.findAll(query);
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Vacancy> {
    return this.vacanciesService.findById(id);
  }

  @Post()
  @Roles('admin')
  @UseGuards(RolesGuard)
  async createVacancy(
    @Body() createVacancyDto: CreateVacancyDto,
    @Request() req: any,
  ): Promise<Vacancy> {
    // Check if this company exists
    const company: any = await this.companiesService.findById(
      createVacancyDto.companyId,
    );

    if (!company) {
      throw new HttpException('Company not found.', HttpStatus.NOT_FOUND);
    }

    // Can only create new vacancy for user's own company
    if (createVacancyDto.companyId != req.user.companyId) {
      throw new HttpException('Not authorized.', HttpStatus.FORBIDDEN);
    }
    return this.vacanciesService.create(createVacancyDto);
  }

  @Patch(':vacancyId')
  @Roles('admin')
  @UseGuards(RolesGuard)
  async updateVacancy(
    @Param('vacancyId') vacancyId: string,
    @Body() updateVacancyDto: UpdateVacancyDto,
    @Request() req: any,
  ): Promise<Vacancy> {
    const vacancy: Vacancy = await this.vacanciesService.findById(vacancyId);
    const companyId: string = vacancy.companyId.toString();

    // Can only update the vacancy that belongs to user's own company
    if (companyId !== req.user.companyId) {
      throw new HttpException('Not authorized.', HttpStatus.FORBIDDEN);
    }
    return this.vacanciesService.update(vacancyId, updateVacancyDto);
  }

  @Roles('admin')
  @UseGuards(RolesGuard)
  @Delete(':vacancyId')
  async removeVacancy(
    @Param('vacancyId') vacancyId: string,
    @Request() req: any,
  ): Promise<Vacancy> {
    const vacancy: Vacancy = await this.vacanciesService.findById(vacancyId);
    const companyId: string = vacancy.companyId.toString();

    // Can only delete the vacancy that belongs to user's own company
    if (companyId !== req.user.companyId) {
      throw new HttpException('Not authorized.', HttpStatus.FORBIDDEN);
    }
    return this.vacanciesService.remove(vacancyId);
  }
}
