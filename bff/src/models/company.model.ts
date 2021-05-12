import { ObjectType, Field } from '@nestjs/graphql';
import { User } from './user.model';
import { Vacancy } from './vacancy.model';

@ObjectType()
export class Company {
  @Field(() => String)
  _id: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  address: string;

  @Field(() => [User])
  users: [User];

  @Field(() => [Vacancy])
  vacancies: [Vacancy];
}
