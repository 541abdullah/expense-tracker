import { forwardRef, Module } from '@nestjs/common';
import { PersonalTransactionResolver } from './personal-transaction.resolver';
import { PersonalTransactionService } from './personal-transaction.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PersonalTransaction } from './entities/personal-transaction.entity'
import { GroupTransactionModule } from '../group-transaction/group-transaction.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([PersonalTransaction]), GroupTransactionModule, forwardRef(() => UserModule)],
  providers: [PersonalTransactionResolver, PersonalTransactionService],
  exports: [PersonalTransactionService]
})
export class PersonalTransactionModule { }




