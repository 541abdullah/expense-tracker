import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class CookieObject {

  @Field()
  access_token: string;

}
