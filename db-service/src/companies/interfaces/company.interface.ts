import { Document } from 'mongoose';

export interface Company extends Document {
  readonly name: string;
  readonly address: string;
}
