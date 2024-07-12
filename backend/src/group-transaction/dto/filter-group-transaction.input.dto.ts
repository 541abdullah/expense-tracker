import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class FilterGroupTransactionInput {


    @Field()
    groupid: string

    @Field({ nullable: true })
    memberid?: string;

    @Field({ nullable: true })
    month?: string;

    @Field({ nullable: true })
    year?: number;

}