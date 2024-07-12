import { Injectable } from '@nestjs/common';
import { CreateGroupTransactionInput } from './dto/create-group-transaction.input.dto';
import { UpdateGroupTransactionInput } from './dto/update-group-transaction.input.dto';
import { FilterGroupTransactionInput } from './dto/filter-group-transaction.input.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { GroupTransaction } from './entities/group-transactions.entity';
import { Repository } from 'typeorm';
import { ChartObject } from 'src/personal-transaction/dto/chart-object.dto';
import { ChartGroupDetsObject } from './dto/chart-member.dto';


@Injectable()
export class GroupTransactionService {
    constructor(@InjectRepository(GroupTransaction) private transactionRepository: Repository<GroupTransaction>) { }

    async create(createGroupTransactionInput: CreateGroupTransactionInput) {

        const newTransaction = this.transactionRepository.create(createGroupTransactionInput);
        newTransaction.month = createGroupTransactionInput.date.toLocaleString('default', { month: 'long' });
        newTransaction.createdAt = new Date()
        return this.transactionRepository.save(newTransaction);


    }

    findGroupTransactions(id: string): Promise<GroupTransaction[]> {

        return this.transactionRepository.find({
            where: { groupGroupID: id },
            order: { createdAt: "DESC" },
            take: 6
        });

    }


    async findOne(id: string): Promise<GroupTransaction> {

        await new Promise(resolve => setTimeout(resolve, 3000))
        return this.transactionRepository.findOneBy({ transactionID: id })

    }


    async getChart(id: string): Promise<ChartObject> {

        const alltrans = await this.transactionRepository.findBy({ groupGroupID: id });

        let Saving = 0
        let Expense = 0
        let Investment = 0
        let total = 0

        alltrans.map((each) => {
            total += each.Amount
            if (each.category === 'Saving') {
                Saving += each.Amount
            } else if (each.category === 'Expense') {
                Expense += each.Amount
            } else {
                Investment += each.Amount
            }
        })

        if (total == 0) {
            Saving = 0;
            Expense = 0;
            Investment = 0;
        } else {
            Saving = (Saving * 100) / total
            Expense = (Expense * 100) / total
            Investment = (Investment * 100) / total
        }



        return {
            Saving,
            Expense,
            Investment
        }

    }

    async filterMemberTransactions(filterGroupTransactionInput: FilterGroupTransactionInput) {

        let { memberid, month, year, groupid } = filterGroupTransactionInput

        if (month === "") {
            month = null;
        }

        if (memberid === "") {
            memberid = null
        }

        let yearbool = true

        if (year == 0) {
            yearbool = false;
        }



        if (month && yearbool) {

            var dateObject = this.filterDateHelper(year, month);

            const queryBuilder = this.transactionRepository.createQueryBuilder("group_transaction");
            queryBuilder.andWhere('group_transaction.groupGroupID = :groupid', { groupid });
            memberid && queryBuilder.andWhere('group_transaction.groupMemberId = :memberid', { memberid });
            queryBuilder.andWhere('group_transaction.date > :prev', { prev: dateObject.prev });
            queryBuilder.andWhere('group_transaction.date < :next', { next: dateObject.next });
            queryBuilder.orderBy('group_transaction.date', 'DESC');

            return queryBuilder.select().getMany()

        } else if (month) {

            const queryBuilder = this.transactionRepository.createQueryBuilder("group_transaction");
            queryBuilder.andWhere('group_transaction.groupGroupID = :groupid', { groupid });
            memberid && queryBuilder.andWhere('group_transaction.groupMemberId = :memberid', { memberid });
            queryBuilder.andWhere('group_transaction.month = :month', { month });
            queryBuilder.orderBy('group_transaction.date', 'DESC');

            return queryBuilder.select().getMany()

        } else if (yearbool) {

            var prevYear: string = `${year - 1}-12-31Z`
            var nextYear: string = `${year + 1}-01-01Z`

            var prev: Date = new Date(prevYear);
            var next: Date = new Date(nextYear);

            const queryBuilder = this.transactionRepository.createQueryBuilder("group_transaction");
            queryBuilder.andWhere('group_transaction.groupGroupID = :groupid', { groupid });
            memberid && queryBuilder.andWhere('group_transaction.groupMemberId = :memberid', { memberid });
            queryBuilder.andWhere('group_transaction.date > :prev', { prev });
            queryBuilder.andWhere('group_transaction.date < :next', { next });
            queryBuilder.orderBy('group_transaction.date', 'DESC');

            return queryBuilder.select().getMany()


        } else if (memberid) {

            const queryBuilder = this.transactionRepository.createQueryBuilder("group_transaction");
            queryBuilder.andWhere('group_transaction.groupGroupID = :groupid', { groupid });
            queryBuilder.andWhere('group_transaction.groupMemberId = :memberid', { memberid });
            queryBuilder.orderBy('group_transaction.date', 'DESC');

            return queryBuilder.select().getMany()

        }


    }

    filterDateHelper(year: number, month: string) {

        const monthNames: string[] = ["January", "February", "March", "April",
            "May", "June", "July", "August",
            "September", "October", "November", "December"]

        var prevyear: number = year
        var nextyear: number = year
        var numofdays: number[];

        if (year % 4 == 0) {
            numofdays = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
        } else {
            numofdays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
        }

        const current: number = monthNames.indexOf(month);

        var prev: number = current;
        var next: number = current + 2;

        if (current == 0) {
            prevyear -= 1;
            prev = 12;
        } else if (current == 11) {
            nextyear += 1;
            next = 1;
        }

        var prevstr: string;
        var nextstr: string;

        if (prev > 9) {
            prevstr = `${prevyear}-${prev}-${numofdays[prev - 1]}Z`
        } else {
            prevstr = `${prevyear}-0${prev}-${numofdays[prev - 1]}Z`
        }

        if (next > 9) {
            nextstr = `${nextyear}-${next}-01Z`
        } else {
            nextstr = `${nextyear}-0${next}-01Z`
        }

        var prevDate = new Date(prevstr);
        var NextDate = new Date(nextstr);


        return {
            prev: prevDate,
            next: NextDate
        }

    }

    async update(updateGroupTransactionInput: UpdateGroupTransactionInput) {

        const transaction = await this.transactionRepository.findOneBy({ transactionID: updateGroupTransactionInput.transactionID });

        if (updateGroupTransactionInput.Amount) {
            transaction.Amount = updateGroupTransactionInput.Amount
        }
        if (updateGroupTransactionInput.category) {
            transaction.category = updateGroupTransactionInput.category
        }
        if (updateGroupTransactionInput.date) {
            transaction.date = updateGroupTransactionInput.date
            transaction.month = updateGroupTransactionInput.date.toLocaleString('default', { month: 'long' });
        }

        if (updateGroupTransactionInput.location) {
            transaction.location = updateGroupTransactionInput.location
        }

        if (updateGroupTransactionInput.paymentType) {
            transaction.paymentType = updateGroupTransactionInput.paymentType
        }

        if (updateGroupTransactionInput.transaction) {
            transaction.transaction = updateGroupTransactionInput.transaction
        }
        transaction.createdAt = new Date()


        return this.transactionRepository.save(transaction);

    }

    async remove(id: string) {

        const transaction = await this.transactionRepository.findOneBy({ transactionID: id });
        this.transactionRepository.remove(transaction)
        return {
            result: "success"
        }


    }


    async getStats(id: string) {

        const array = await this.transactionRepository.findBy({ groupMemberId: id })

        let Saving = 0;
        let Investment = 0;
        let Expense = 0;

        array.forEach((each) => {
            if (each.category === 'Saving') {
                Saving += each.Amount
            } else if (each.category === 'Expense') {
                Expense += each.Amount
            } else {
                Investment += each.Amount
            }
        })

        let total = Saving + Investment + Expense;
        let SavingPercentage = 0
        if (total == 0) {
            SavingPercentage = 0
        } else {
            SavingPercentage = (Saving / total) * 100
        }


        return {
            Saving,
            Investment,
            Expense,
            SavingPercentage,
            total
        }

    }


    async getVisitStats(gid: string, mid: string): Promise<ChartGroupDetsObject> {

        const array = await this.transactionRepository.findBy({ groupGroupID: gid })

        let Saving = 0;
        let Investment = 0;
        let Expense = 0;
        let TotalSaving = 0;
        let TotalInvestment = 0;
        let TotalExpense = 0;


        array.forEach((each) => {
            if (each.category == 'Saving') {
                TotalSaving += each.Amount
                if (each.groupMemberId === mid) {
                    Saving += each.Amount
                }
            } else if (each.category == 'Expense') {
                TotalExpense += each.Amount
                if (each.groupMemberId === mid) {
                    Expense += each.Amount
                }
            } else {

                TotalInvestment += each.Amount
                if (each.groupMemberId === mid) {
                    Investment += each.Amount
                }

            }
        })



        let total = Saving + Expense + Investment
        let SavingPercentage = 0

        if (total != 0) {
            SavingPercentage = (Saving / total) * 100
        }


        let ChartSaving = 0;
        let ChartExpense = 0;
        let ChartInvestment = 0;

        if (TotalSaving != 0) {
            ChartSaving = (Saving / TotalSaving) * 100
        }

        if (TotalExpense != 0) {
            ChartExpense = (Expense / TotalExpense) * 100
        }

        if (TotalInvestment != 0) {
            ChartInvestment = (Investment / TotalInvestment) * 100
        }


        return {
            Saving,
            Expense,
            Investment,
            SavingPercentage,
            ChartSaving,
            ChartInvestment,
            ChartExpense,
            TotalSaving,
            TotalExpense,
            TotalInvestment
        }


    }


    deleteAllGroupTrans(gid: string) {
        this.transactionRepository.delete({ groupGroupID: gid })
    }

}




