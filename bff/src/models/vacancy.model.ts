import { ObjectType, Field } from '@nestjs/graphql';
import { Company } from './company.model';

@ObjectType()
export class Vacancy {
  @Field(() => String)
  _id: string;

  @Field(() => String)
  title: string;

  @Field(() => String)
  description: string;

  @Field(() => String)
  expiredAt: string;

  @Field(() => Company)
  company: Company;

  @Field(() => String)
  companyId: string;
}
