import { Module } from '@nestjs/common';
import { GroupTransactionService } from './group-transaction.service';
import { GroupTransactionResolver } from './group-transaction.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupTransaction } from './entities/group-transactions.entity'

@Module({
  imports: [TypeOrmModule.forFeature([GroupTransaction])],
  providers: [GroupTransactionService, GroupTransactionResolver],
  exports: [GroupTransactionService]
})
export class GroupTransactionModule { }
