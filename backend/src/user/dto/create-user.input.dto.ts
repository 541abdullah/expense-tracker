import { InputType, Field } from '@nestjs/graphql';
import { MinLength } from 'class-validator';

@InputType()
export class CreateUserInput {



  @MinLength(8, { message: "username should be greater than 7 characters" })
  @Field()
  personalUsername: string

  @Field()
  avatar: string;

  @Field()
  password: string;


}
