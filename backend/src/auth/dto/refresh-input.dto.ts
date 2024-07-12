import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class RefreshInput {

  @Field()
  username: string

  @Field()
  id: string;
}
