import { Field, ObjectType } from '@nestjs/graphql';


@ObjectType()
export class LogoutStatus {

  @Field()
  status: string

}
