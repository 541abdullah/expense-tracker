import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input.dto';
import { UpdateUserInput } from './dto/update-user.input.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { PersonalTransactionService } from '../personal-transaction/personal-transaction.service';
import * as bcrypt from 'bcrypt';
import { AuthService } from '../auth/auth.service';
import { Groups } from '../group/entities/groups.entity';
import { GroupService } from '../group/group.service';
import { PersonalTransaction } from '../personal-transaction/entities/personal-transaction.entity';
import { GroupTransactionService } from '../group-transaction/group-transaction.service';


@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private userRepository: Repository<User>, @Inject(forwardRef(() => PersonalTransactionService)) private personalTransactionService: PersonalTransactionService, @Inject(forwardRef(() => AuthService)) private authService: AuthService, @Inject(forwardRef(() => GroupService)) private groupService: GroupService, private groupTransactionService: GroupTransactionService) { }

  async create(createUserInput: CreateUserInput) {



    const user = await this.userRepository.findOneBy({ personalUsername: createUserInput.personalUsername });


    if (user) {
      throw new Error('username already in use..')
    }


    const password = await bcrypt.hash(createUserInput.password, 10);
    createUserInput.password = password;

    const newuser = this.userRepository.create(createUserInput);
    newuser.alive = true;

    return this.userRepository.save(newuser);

  }

  findAll() {
    return this.userRepository.findBy({ alive: true });
  }

  findOne(id: string) {

    return this.userRepository.findOneBy({ id: id });

  }

  findOneByUsername(username: string) {
    return this.userRepository.findOneBy({ personalUsername: username })
  }


  async update(updateUserInput: UpdateUserInput): Promise<User> {
    const user = await this.userRepository.findOneBy({ personalUsername: updateUserInput.username });
    user.avatar = updateUserInput.avatar;
    return this.userRepository.save(user);
  }

  async delete(id: string) {

    const user = await this.userRepository.findOneBy({ id: id });
    user.alive = false;

    await this.userRepository.save(user);


    await this.personalTransactionService.deleteAllTransactions(id);

    await this.groupService.findAllGroupAccDel(id)

    return {
      result: "success"
    }

  }


  // chartstats

  async getStats(id: string) {


    const PObject = await this.personalTransactionService.getStats(id)
    const GObject = await this.groupTransactionService.getStats(id)

    let total = PObject.total + GObject.total

    let ChartSaving = 0
    let ChartInvestment = 0
    let ChartExpense = 0

    if (total != 0) {
      ChartSaving = ((PObject.Saving + GObject.Saving) / total) * 100
      ChartInvestment = ((PObject.Investment + GObject.Investment) / total) * 100
      ChartExpense = ((PObject.Expense + GObject.Expense) / total) * 100
    }



    return {
      PSaving: PObject.Saving,
      PInvestment: PObject.Investment,
      PExpense: PObject.Expense,
      PSavingPercentage: PObject.SavingPercentage,
      GSaving: GObject.Saving,
      GInvestment: GObject.Investment,
      GExpense: GObject.Expense,
      GSavingPercentage: GObject.SavingPercentage,
      ChartSaving,
      ChartInvestment,
      ChartExpense
    }

  }


  // relationshipss

  getGroups(mid: string): Promise<Groups[]> {
    return this.groupService.findMany(mid);
  }

  getTransactions(cid: string): Promise<PersonalTransaction[]> {
    return this.personalTransactionService.findMany(cid);
  }

}

