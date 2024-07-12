import { Field, ObjectType } from '@nestjs/graphql';


@ObjectType()
export class RefreshStatus {

  @Field()
  status: string

}
