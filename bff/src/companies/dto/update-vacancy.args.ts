import { Field, ArgsType } from '@nestjs/graphql';
import { IsDateString } from 'class-validator';

@ArgsType()
export class UpdateVacancyArgs {
  @Field({ nullable: true })
  title: string;

  @Field({ nullable: true })
  description: string;

  @Field({ nullable: true })
  @IsDateString()
  expiredAt: string;
}
