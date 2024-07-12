import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class UserNoPassword {

  @Field()
  id: string;

  @Field()
  personalUsername: string;

  @Field()
  avatar: string;


}
