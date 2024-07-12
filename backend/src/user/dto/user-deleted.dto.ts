import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class UserDeletedObject {

  @Field()
  result: string;

}
