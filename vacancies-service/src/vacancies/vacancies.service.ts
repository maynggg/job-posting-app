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

  async create(createVacancyDto: CreateVacancyDto): Promise<Vacancy> {
    const createdVacancy = new this.vacancyModel(createVacancyDto);
    return createdVacancy.save();
  }

  async findAll(query): Promise<Vacancy[]> {
    if (query.companyId) {
      query.companyId = new mongoose.Types.ObjectId(query.companyId);
    }
    return this.vacancyModel.find(query);
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
}
