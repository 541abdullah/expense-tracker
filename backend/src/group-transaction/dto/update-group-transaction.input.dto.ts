import { InputType, Field } from '@nestjs/graphql';


@InputType()
export class UpdateGroupTransactionInput {

  @Field()
  transactionID: string;

  @Field({ nullable: true })
  transaction: string;

  @Field({ nullable: true })
  paymentType: string;

  @Field({ nullable: true })
  category: string;

  @Field({ nullable: true })
  Amount: number;

  @Field({ nullable: true })
  location: string;

  @Field({ nullable: true })
  date: Date;

}
