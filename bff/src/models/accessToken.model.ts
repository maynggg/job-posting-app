import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class AccessToken {
  @Field(() => String)
  accessToken: string;
}
