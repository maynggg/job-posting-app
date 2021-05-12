import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';

import { CreateCompanyDto } from './dto/create-company.dto';
import { Company } from './interfaces/company.interface';

@Injectable()
export class CompaniesService {
  constructor(
    @Inject('COMPANY_MODEL')
    private companyModel: Model<Company>,
  ) {}

  async create(createCompanyDto: CreateCompanyDto): Promise<Company> {
    const createdCompany = new this.companyModel(createCompanyDto);
    return createdCompany.save();
  }

  async findAll(): Promise<Company[]> {
    return this.companyModel.find().exec();
  }

  async findById(id: string): Promise<Company> {
    return this.companyModel.findById(id).exec();
  }
}
