import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class FilterPersonalTransactionInput {


    @Field()
    creatorID: string

    @Field({ nullable: true })
    month?: string;

    @Field({ nullable: true })
    year?: number;

}