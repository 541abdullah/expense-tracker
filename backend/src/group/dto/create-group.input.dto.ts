import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateGroupInput {


  @Field({ nullable: true })
  groupID?: string

  @Field({ nullable: true })
  groupName?: string

  @Field()
  memberName: string;

  @Field()
  memberId: string


}