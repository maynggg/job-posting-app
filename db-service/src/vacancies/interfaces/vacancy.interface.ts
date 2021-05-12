import { Document } from 'mongoose';

export interface Vacancy extends Document {
  readonly companyId: string;
  readonly title: string;
  readonly description: string;
  readonly expiredAt: Date;
}
