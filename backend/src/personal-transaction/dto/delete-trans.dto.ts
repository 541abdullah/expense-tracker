import { ObjectType, Field } from '@nestjs/graphql';



@ObjectType()
export class TransDeletionObject {

  @Field()
  result: string


}
