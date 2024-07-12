import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateGroupTransactionInput {


    @Field()
    transaction: string

    @Field()
    paymentType: string;

    @Field()
    category: string;

    @Field()
    Amount: number;

    @Field()
    location: string;

    @Field()
    date: Date;


    @Field()
    groupGroupID: string;

    @Field()
    groupMemberId: string;

}