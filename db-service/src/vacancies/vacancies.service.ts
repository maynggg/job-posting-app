import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';

import { Vacancy } from './interfaces/vacancy.interface';
import { CreateVacancyDto } from './dto/create-vacancy.dto';
import { UpdateVacancyDto } from './dto/update-vacancy.dto';
import * as mongoose from 'mongoose';

@Injectable()
export class VacanciesService {
  constructor(
    @Inject('VACANCY_MODEL')
    private vacancyModel: Model<Vacancy>,
  ) {}

  async create(
    companyId: string,
    createVacancyDto: CreateVacancyDto,
  ): Promise<Vacancy> {
    const createdVacancy = new this.vacancyModel({
      companyId,
      ...createVacancyDto,
    });
    return createdVacancy.save();
  }

  async findAll(): Promise<Vacancy[]> {
    return this.vacancyModel.find().exec();
  }

  async findById(id: string): Promise<Vacancy> {
    return this.vacancyModel.findById(id).exec();
  }

  async update(
    id: string,
    updateVacancyDto: UpdateVacancyDto,
  ): Promise<Vacancy> {
    const toUpdate = this.vacancyModel.findById(id).exec();
    return this.vacancyModel
      .findOneAndUpdate(toUpdate, updateVacancyDto, {
        new: true,
      })
      .exec();
  }

  async remove(id: string): Promise<Vacancy> {
    return this.vacancyModel.findByIdAndDelete(id).exec();
  }

  async findByCompanyId(companyId: string): Promise<Vacancy[]> {
    const query: any = { companyId: new mongoose.Types.ObjectId(companyId) };
    return await this.vacancyModel.find(query).exec();
  }
}
