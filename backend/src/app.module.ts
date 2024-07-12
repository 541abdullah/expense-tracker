import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { GroupModule } from './group/group.module';
import { GroupTransactionModule } from './group-transaction/group-transaction.module';
import { PersonalTransactionModule } from './personal-transaction/personal-transaction.module';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [GraphQLModule.forRoot<ApolloDriverConfig>({
    autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    context: ({ req, res }) => ({ req, res }),
    driver: ApolloDriver,
  }),
  TypeOrmModule.forRoot({
    type: 'sqlite',
    database: 'database',
    entities: ['dist/**/*.entity{.ts,.js}'],
    synchronize: true
  }),
    UserModule,
    GroupModule,
    GroupTransactionModule,
    PersonalTransactionModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService,],
})
export class AppModule { }

