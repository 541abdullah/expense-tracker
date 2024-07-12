import { Field, ObjectType } from '@nestjs/graphql';
import { User } from '../../user/entities/user.entity';

@ObjectType()
export class LoginStatus {


  @Field()
  status: string;

  @Field(() => User)
  user: User;

}
