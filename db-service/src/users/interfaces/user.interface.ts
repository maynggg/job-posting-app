import { Document } from 'mongoose';

export interface User extends Document {
  companyId: string;
  name: string;
  username: string;
  passwordSalt: string;
  passwordHash: string;
  role: string;
}
