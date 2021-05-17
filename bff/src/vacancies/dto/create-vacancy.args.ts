import { Field, ArgsType } from '@nestjs/graphql';
import { IsDateString } from 'class-validator';

@ArgsType()
export class CreateVacancyArgs {
  @Field({ nullable: false })
  companyId: string;

  @Field({ nullable: false })
  title: string;

  @Field({ nullable: false })
  description: string;

  @Field({ nullable: false })
  @IsDateString()
  expiredAt: string;
}
