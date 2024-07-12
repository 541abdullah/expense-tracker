import { Module, forwardRef } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity'
import { PersonalTransactionModule } from '../personal-transaction/personal-transaction.module';
import { AuthModule } from '../auth/auth.module';
import { GroupModule } from '../group/group.module';
import { GroupTransactionModule } from '../group-transaction/group-transaction.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => PersonalTransactionModule), forwardRef(() => GroupModule), forwardRef(() => AuthModule), GroupTransactionModule],
  providers: [UserService, UserResolver],
  exports: [UserService]
})
export class UserModule { }
