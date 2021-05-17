import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ type: mongoose.Schema.Types.ObjectId, auto: true })
  _id: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Company' })
  companyId: string;

  @Prop()
  username: string;

  @Prop()
  name: string;

  @Prop({ select: false })
  passwordHash: string;

  @Prop({ select: false })
  passwordSalt: string;

  @Prop()
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
