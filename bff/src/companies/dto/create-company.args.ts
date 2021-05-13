import { Field, ArgsType } from '@nestjs/graphql';

@ArgsType()
export class CreateCompanyArgs {
  @Field({ nullable: false })
  name: string;

  @Field({ nullable: false })
  address: string;
}
