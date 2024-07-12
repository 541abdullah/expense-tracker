import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { GroupTransactionService } from './group-transaction.service';
import { GroupTransaction } from './entities/group-transactions.entity';
import { CreateGroupTransactionInput } from './dto/create-group-transaction.input.dto';
import { UpdateGroupTransactionInput } from './dto/update-group-transaction.input.dto';
import { FilterGroupTransactionInput } from './dto/filter-group-transaction.input.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ChartObject } from '../personal-transaction/dto/chart-object.dto';
import { TransDeletionObject } from 'src/personal-transaction/dto/delete-trans.dto';
import { ChartGroupDetsObject } from './dto/chart-member.dto';

@Resolver((of) => GroupTransaction)
export class GroupTransactionResolver {

  constructor(private readonly groupTransactionService: GroupTransactionService) { }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => GroupTransaction)
  createTransaction(@Args('createGroupTransactionInput') createGroupTransactionInput: CreateGroupTransactionInput) {
    return this.groupTransactionService.create(createGroupTransactionInput);
  }


  @UseGuards(JwtAuthGuard)
  @Query(() => ChartObject)
  chartGroupTransactions(@Args('id', { type: () => String }) id: string) {
    return this.groupTransactionService.getChart(id);
  }



  @UseGuards(JwtAuthGuard)
  @Mutation(() => GroupTransaction)
  editGTransaction(@Args('updateGroupTransactionInput') updateGroupTransactionInput: UpdateGroupTransactionInput) {
    return this.groupTransactionService.update(updateGroupTransactionInput);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => TransDeletionObject)
  removeGTransaction(@Args('id', { type: () => String }) id: string) {
    return this.groupTransactionService.remove(id);
  }



  @UseGuards(JwtAuthGuard)
  @Query(() => [GroupTransaction], { name: 'groupTransactions' })
  findAll(@Args('id', { type: () => String }) id: string) {
    return this.groupTransactionService.findGroupTransactions(id);
  }


  @UseGuards(JwtAuthGuard)
  @Query(() => GroupTransaction, { name: 'findOneGtrans' })
  findOneById(@Args('id', { type: () => String }) id: string) {
    return this.groupTransactionService.findOne(id);
  }



  @UseGuards(JwtAuthGuard)
  @Query(() => ChartGroupDetsObject, { name: 'chartdatagroupie' })
  getVisitStats(@Args('gid', { type: () => String }) gid: string, @Args('mid', { type: () => String }) mid: string) {
    return this.groupTransactionService.getVisitStats(gid, mid);
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [GroupTransaction], { name: 'filterGroupTransactions' })
  findCreatorTransactions(@Args('filterGroupTransactionInput') filterGroupTransactionInput: FilterGroupTransactionInput) {
    return this.groupTransactionService.filterMemberTransactions(filterGroupTransactionInput);
  }


}

