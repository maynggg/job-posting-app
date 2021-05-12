import { ObjectType, Field } from '@nestjs/graphql';
import { Company } from './company.model';

@ObjectType()
export class User {
  @Field(() => String)
  _id: string;

  @Field(() => String)
  username: string;

  @Field(() => String)
  role: string;

  @Field(() => String)
  name: string;

  @Field(() => Company)
  company: Company;

  @Field(() => String)
  companyId: string;
}
