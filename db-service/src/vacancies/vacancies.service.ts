import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';

import { Vacancy, VacancyDocument } from './schemas/vacancy.schema';
import { CreateVacancyDto } from './dto/create-vacancy.dto';
import { UpdateVacancyDto } from './dto/update-vacancy.dto';
import * as mongoose from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class VacanciesService {
  constructor(
    @InjectModel(Vacancy.name) private vacancyModel: Model<VacancyDocument>,
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
    return this.vacancyModel.find();
  }

  async findById(id: string): Promise<Vacancy> {
    return this.vacancyModel.findById(id);
  }

  async update(
    id: string,
    updateVacancyDto: UpdateVacancyDto,
  ): Promise<Vacancy> {
    const toUpdate = this.vacancyModel.findById(id);
    return this.vacancyModel.findOneAndUpdate(toUpdate, updateVacancyDto, {
      new: true,
    });
  }

  async remove(id: string): Promise<Vacancy> {
    return this.vacancyModel.findByIdAndDelete(id);
  }

  async findByCompanyId(companyId: string): Promise<Vacancy[]> {
    const query: any = { companyId: new mongoose.Types.ObjectId(companyId) };
    return await this.vacancyModel.find(query);
  }
}
