import { Field, ArgsType } from '@nestjs/graphql';
import { IsEnum } from 'class-validator';

const Role = {
  ADMIN: 'admin',
  USER: 'user',
};

@ArgsType()
export class SignupArgs {
  @Field({ nullable: false })
  companyId: string;

  @Field({ nullable: false })
  name: string;

  @Field({ nullable: false })
  username: string;

  @Field({ nullable: false })
  password: string;

  @Field({ nullable: false })
  @IsEnum(Role)
  role: string;
}
