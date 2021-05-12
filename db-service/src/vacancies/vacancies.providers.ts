import { Connection } from 'mongoose';
import { VacancySchema } from './schemas/vacancy.schema';

export const vacanciesProviders = [
  {
    provide: 'VACANCY_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Vacancy', VacancySchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
