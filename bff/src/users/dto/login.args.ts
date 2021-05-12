import { Field, ArgsType } from '@nestjs/graphql';

@ArgsType()
export class LoginArgs {
  @Field({ nullable: false })
  username: string;

  @Field({ nullable: false })
  password: string;
}
