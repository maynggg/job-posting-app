import * as mongoose from 'mongoose';

export const VacancySchema = new mongoose.Schema({
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
  },
  title: String,
  description: String,
  expiredAt: Date,
});
