import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreatePersonalTransactionInput {

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
    creatorId?: string;


}