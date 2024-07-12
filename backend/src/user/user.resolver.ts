import { Resolver, Query, Mutation, Args, Parent, ResolveField } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input.dto';
import { UpdateUserInput } from './dto/update-user.input.dto';
import { UseGuards, ValidationPipe } from '@nestjs/common';
import { UserNoPassword } from './dto/usernopassword.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CurrentUser } from '../auth/currentuser.decorator';
import { Groups } from '../group/entities/groups.entity';
import { PersonalTransaction } from '../personal-transaction/entities/personal-transaction.entity';
import { UserDeletedObject } from './dto/user-deleted.dto';
import { StatObject } from './dto/stats-object.dto';


@Resolver((of) => User)
export class UserResolver {
  constructor(private readonly userService: UserService) { }

  @Mutation(() => UserNoPassword)
  createUser(@Args('createUserInput', ValidationPipe) createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput);
  }


  @Query(() => [UserNoPassword], { name: 'users' })
  @UseGuards(JwtAuthGuard)
  findAll() {
    return this.userService.findAll();
  }


  // no guard

  @Query(() => User, { name: 'user' })
  findOne(@Args('id') id: string) {
    return this.userService.findOne(id);
  }


  @UseGuards(JwtAuthGuard)
  @Mutation(() => UserNoPassword)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.userService.update(updateUserInput);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => UserDeletedObject)
  deleteUser(@Args('id', { type: () => String }) id: string) {
    return this.userService.delete(id);
  }


  @UseGuards(JwtAuthGuard)
  @Query(() => User, { name: 'me' })
  getMe(@CurrentUser() user: User) {

    return this.userService.findOne(user.id);

  }


  @Query(() => StatObject, { name: 'myStats' })
  getMeStats(@Args('id', { type: () => String }) id: string) {

    return this.userService.getStats(id);

  }


  // relationships

  @UseGuards(JwtAuthGuard)
  @ResolveField(returns => [Groups])
  allMyGroups(@Parent() user: User): Promise<Groups[]> {
    return this.userService.getGroups(user.id);
  }

  @UseGuards(JwtAuthGuard)
  @ResolveField(returns => [PersonalTransaction])
  allMyTransactions(@Parent() user: User): Promise<PersonalTransaction[]> {
    return this.userService.getTransactions(user.id);
  }


}
