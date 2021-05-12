import { Connection } from 'mongoose';
import { CompanySchema } from './schemas/company.schema';

export const companiesProviders = [
  {
    provide: 'COMPANY_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Company', CompanySchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
