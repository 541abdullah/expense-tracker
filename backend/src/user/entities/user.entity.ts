import { ObjectType, Field } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Groups } from '../../group/entities/groups.entity';
import { PersonalTransaction } from '../../personal-transaction/entities/personal-transaction.entity';


@Entity()
@ObjectType()
export class User {

  @PrimaryGeneratedColumn("uuid")
  @Field()
  id: string;

  @Column()
  @Field()
  personalUsername: string;

  @OneToMany(() => Groups, groups => groups.member)
  @Field(type => [Groups], { nullable: true })
  groups?: Groups[];

  @OneToMany(() => PersonalTransaction, personalTransaction => personalTransaction.creator)
  @Field(type => [PersonalTransaction], { nullable: true })
  transactions?: PersonalTransaction[];

  @Column()
  @Field()
  password: string;


  @Column()
  @Field()
  avatar: string;

  @Column()
  @Field()
  alive: boolean;



}
