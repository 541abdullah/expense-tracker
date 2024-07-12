
import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class UpdateGroupInput {

  @Field()
  groupID: string;

  @Field({ nullable: true })
  memberId?: string;

  @Field({ nullable: true })
  memberName?: string;

  @Field({ nullable: true })
  groupName?: string;



}
