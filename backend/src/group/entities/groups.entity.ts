import { ObjectType, Field } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, OneToMany, PrimaryColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { GroupTransaction } from '../../group-transaction/entities/group-transactions.entity';



@Entity()
@ObjectType()
export class Groups {

  @PrimaryColumn()
  @Field()
  groupID: string;

  @Column()
  @Field()
  groupName: string;

  @Column()
  @Field()
  alive: Boolean;

  @Column()
  @Field()
  memberName: string;


  @ManyToOne(() => User, user => user.groups)
  @Field(type => User)
  member: User

  @PrimaryColumn()
  @Field()
  memberId: string

  @OneToMany(() => GroupTransaction, groupTransaction => groupTransaction.group)
  @Field(type => [GroupTransaction], { nullable: true })
  transactions?: GroupTransaction[];



}