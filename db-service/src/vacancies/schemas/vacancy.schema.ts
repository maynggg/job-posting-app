import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export type VacancyDocument = Vacancy & Document;

@Schema()
export class Vacancy {
  @Prop({ type: mongoose.Schema.Types.ObjectId })
  _id: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Company' })
  companyId: string;

  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop({ type: Date })
  expiredAt: Date;
}

export const VacancySchema = SchemaFactory.createForClass(Vacancy);
