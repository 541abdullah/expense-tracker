import { ObjectType, Field } from '@nestjs/graphql';



@ObjectType()
export class ChartObject {

  @Field()
  Saving: number;

  @Field()
  Expense: number;

  @Field()
  Investment: number;


}
