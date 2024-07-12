import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent } from '@nestjs/graphql';
import { GroupService } from './group.service';
import { Groups } from './entities/groups.entity';
import { CreateGroupInput } from './dto/create-group.input.dto';
import { UpdateGroupInput } from './dto/update-group.input.dto';
import { User } from '../user/entities/user.entity';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Resolver((of) => Groups)
export class GroupResolver {

  constructor(private readonly groupService: GroupService) { }

  @Mutation(() => Groups)
  createMemberOfGroup(@Args('createGroupInput') createGroupInput: CreateGroupInput) {
    return this.groupService.create(createGroupInput);
  }


  // @UseGuards(JwtAuthGuard)
  @Query(() => [Groups])
  getGdata(@Args('id', { type: () => String }) id: string) {
    return this.groupService.getGroupData(id);
  }

  @Query(() => [Groups], { name: 'groupMembers' })
  findAllMember(@Args('id', { type: () => String }) id: string) {
    return this.groupService.findMembers(id);
  }


  @Query(() => Groups, { name: 'groupsStats' })
  findOneDetails(@Args('id', { type: () => String }) id: string) {
    return this.groupService.findDets(id);
  }



  @UseGuards(JwtAuthGuard)
  @Mutation(() => Groups)
  updateGroup(@Args('updateGroupInput') updateGroupInput: UpdateGroupInput) {
    return this.groupService.update(updateGroupInput.groupID, updateGroupInput);
  }



  @Query(() => [Groups], { name: "grouptotaldata" })
  findmuch(@Args('id', { type: () => String }) id: string) {
    return this.groupService.findmuch(id);
  }


  // relationships

  @ResolveField(returns => [User])
  members(@Parent() groups: Groups): Promise<User[]> {
    return this.groupService.getUsers(groups.groupID);
  }

  @ResolveField(returns => User)
  member(@Parent() groups: Groups): Promise<User> {
    return this.groupService.getUser(groups.memberId);
  }

}




