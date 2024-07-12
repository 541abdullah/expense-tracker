import { ObjectType, Field } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../user/entities/user.entity';



@Entity()
@ObjectType()
export class PersonalTransaction {

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

  @ManyToOne(() => User, user => user.transactions)
  @Field(type => User)
  creator: User

  @Column()
  @Field()
  creatorId: string;

}