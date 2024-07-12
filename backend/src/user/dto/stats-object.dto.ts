import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class StatObject {


  @Field()
  PSaving: number;

  @Field()
  PInvestment: number;

  @Field()
  PExpense: number;

  @Field()
  PSavingPercentage: number;

  @Field()
  GSaving: number;

  @Field()
  GInvestment: number;

  @Field()
  GExpense: number;

  @Field()
  GSavingPercentage: number;

  @Field()
  ChartSaving: number;

  @Field()
  ChartInvestment: number;

  @Field()
  ChartExpense: number;

}
