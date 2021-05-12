import * as mongoose from 'mongoose';

const Role = {
  ADMIN: 'admin',
  USER: 'user',
};

const UserSchema = new mongoose.Schema({
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
  },
  name: String,
  username: {
    type: String,
    index: { unique: true },
  },
  passwordHash: {
    type: String,
    required: true,
  },
  passwordSalt: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: [Role.ADMIN, Role.USER],
  },
});

UserSchema.methods.toJSON = function toJSON() {
  const obj = this.toObject();
  delete (obj as any).passwordHash;
  delete (obj as any).passwordSalt;
  delete obj.__v;
  return obj;
};

export { UserSchema };
