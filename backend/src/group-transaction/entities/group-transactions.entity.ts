import { ObjectType, Field } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Groups } from '../../group/entities/groups.entity';



@Entity()
@ObjectType()
export class GroupTransaction {

  @PrimaryGeneratedColumn("uuid")
  @Field()
  transactionID: string;


  @Column()
  @Field()
  transaction: string

  @Column()
  @Field()
  paymentType: string;

  @Column()
  @Field()
  category: string;

  @Column()
  @Field()
  Amount: number;

  @Column()
  @Field()
  location: string;

  @Column()
  @Field()
  date: Date;

  @Column({ nullable: true })
  @Field({ nullable: true })
  createdAt?: Date;


  @Column()
  @Field()
  month: string;

  @ManyToOne(() => Groups, groups => groups.transactions)
  @Field(type => Groups)
  group: Groups

  @Column()
  @Field({ nullable: true })
  groupGroupID?: string;

  @Column()
  @Field({ nullable: true })
  groupMemberId?: string;



}