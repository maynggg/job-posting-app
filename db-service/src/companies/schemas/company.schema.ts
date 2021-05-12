import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export type CompanyDocument = Company & Document;

@Schema()
export class Company {
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  _id: string;

  @Prop()
  name: string;

  @Prop()
  address: string;
}

export const CompanySchema = SchemaFactory.createForClass(Company);
