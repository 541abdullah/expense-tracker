import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PersonalTransactionService } from './personal-transaction.service';
import { PersonalTransaction } from './entities/personal-transaction.entity'
import { CreatePersonalTransactionInput } from './dto/create-personal-transaction.input.dto';
import { UpdatePersonalTransactionInput } from './dto/update-personal-transaction.input.dto';
import { FilterPersonalTransactionInput } from './dto/filter-personal-transaction.input.dto';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ChartObject } from './dto/chart-object.dto';
import { TransDeletionObject } from './dto/delete-trans.dto';

@Resolver((of) => PersonalTransaction)
export class PersonalTransactionResolver {

  constructor(private readonly personalTransactionService: PersonalTransactionService) { }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => PersonalTransaction)
  createPTransaction(@Args('createPersonalTransactionInput') createPersonalTransactionInput: CreatePersonalTransactionInput) {
    return this.personalTransactionService.create(createPersonalTransactionInput);
  }


  @UseGuards(JwtAuthGuard)
  @Mutation(() => PersonalTransaction)
  editPTransaction(@Args('updatePersonalTransactionInput') updatePersonalTransactionInput: UpdatePersonalTransactionInput) {
    return this.personalTransactionService.update(updatePersonalTransactionInput);
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => TransDeletionObject)
  removePTransaction(@Args('id', { type: () => String }) id: string) {
    return this.personalTransactionService.remove(id);
  }


  // @Query(() => [PersonalTransaction], { name: 'personalTransactions' }) 
  // findAll(@Args('id', { type: () => String }) id: string) {
  //   return this.personalTransactionService.findPersonalTransactions(id);
  // }

  @UseGuards(JwtAuthGuard)
  @Query(() => [PersonalTransaction], { name: 'filterMyTransactions' })
  findCreatorTransactions(@Args('filterPersonalTransactionInput') filterPersonalTransactionInput: FilterPersonalTransactionInput) {
    return this.personalTransactionService.filterMyTransactions(filterPersonalTransactionInput);
  }


  @UseGuards(JwtAuthGuard)
  @Query(() => PersonalTransaction, { name: 'findOne' })
  findOneById(@Args('id', { type: () => String }) id: string) {
    return this.personalTransactionService.findOne(id);
  }


  @UseGuards(JwtAuthGuard)
  @Query(() => ChartObject, { name: 'chartMyTransactions' })
  findPTransactionData(@Args('id', { type: () => String }) id: string) {
    return this.personalTransactionService.myTransactionData(id);
  }


}


