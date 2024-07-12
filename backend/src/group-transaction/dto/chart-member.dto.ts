import { ObjectType, Field } from '@nestjs/graphql';



@ObjectType()
export class ChartGroupDetsObject {

  @Field()
  Saving: number;

  @Field()
  Expense: number;

  @Field()
  Investment: number;

  @Field()
  SavingPercentage: number;

  @Field()
  ChartSaving: number;

  @Field()
  ChartInvestment: number;

  @Field()
  ChartExpense: number;


  @Field()
  TotalSaving: number

  @Field()
  TotalExpense: number

  @Field()
  TotalInvestment: number



}
