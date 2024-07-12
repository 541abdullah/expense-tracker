import { forwardRef, Module } from '@nestjs/common';
import { GroupResolver } from './group.resolver';
import { GroupService } from './group.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Groups } from './entities/groups.entity'
import { UserModule } from '../user/user.module';
import { GroupTransactionModule } from 'src/group-transaction/group-transaction.module';

@Module({
  imports: [TypeOrmModule.forFeature([Groups]), forwardRef(() => UserModule), GroupTransactionModule],
  providers: [GroupResolver, GroupService],
  exports: [GroupService]
})
export class GroupModule { }

