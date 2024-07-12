import { Injectable } from '@nestjs/common';
import { CreatePersonalTransactionInput } from './dto/create-personal-transaction.input.dto';
import { UpdatePersonalTransactionInput } from './dto/update-personal-transaction.input.dto';
import { FilterPersonalTransactionInput } from './dto/filter-personal-transaction.input.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PersonalTransaction } from './entities/personal-transaction.entity';
import { Repository } from 'typeorm';
import { GroupTransactionService } from '../group-transaction/group-transaction.service';
import { ChartObject } from './dto/chart-object.dto';


@Injectable()
export class PersonalTransactionService {

    constructor(@InjectRepository(PersonalTransaction) private transactionRepository: Repository<PersonalTransaction>, private groupTransactionService: GroupTransactionService) { }

    async create(createPersonalTransactionInput: CreatePersonalTransactionInput) {

        const newTransaction = this.transactionRepository.create(createPersonalTransactionInput);
        newTransaction.month = createPersonalTransactionInput.date.toLocaleString('default', { month: 'long' });
        newTransaction.createdAt = new Date()
        return this.transactionRepository.save(newTransaction);

    }

    findMany(id: string): Promise<PersonalTransaction[]> {

        return this.transactionRepository.find({
            where: { creatorId: id },
            order: { createdAt: "DESC" },
            take: 6
        });

    }

    async findOne(id: string): Promise<PersonalTransaction> {

        await new Promise(resolve => setTimeout(resolve, 3000))

        return this.transactionRepository.findOneBy({ transactionID: id })

    }

    async myTransactionData(id: string): Promise<ChartObject> {

        const alltrans = await this.transactionRepository.findBy({ creatorId: id });

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

    async filterMyTransactions(filterPersonalTransactionInput: FilterPersonalTransactionInput) {

        let { creatorID, month, year } = filterPersonalTransactionInput


        if (month === "") {
            month = null;
        }

        let yearbool = true

        if (year == 0) {
            yearbool = false;
        }

        if (month && yearbool) {

            var dateObject = this.groupTransactionService.filterDateHelper(year, month);

            const queryBuilder = this.transactionRepository.createQueryBuilder("personal_transaction");
            queryBuilder.andWhere('personal_transaction.creatorId = :creatorID', { creatorID });
            queryBuilder.andWhere('personal_transaction.date > :prev', { prev: dateObject.prev });
            queryBuilder.andWhere('personal_transaction.date < :next', { next: dateObject.next });
            queryBuilder.orderBy('personal_transaction.date', 'DESC');

            return queryBuilder.select().getMany()

        } else if (month) {

            const queryBuilder = this.transactionRepository.createQueryBuilder("personal_transaction");
            queryBuilder.andWhere('personal_transaction.creatorId = :creatorID', { creatorID });
            queryBuilder.andWhere('personal_transaction.month = :month', { month });
            queryBuilder.orderBy('personal_transaction.date', 'DESC');

            return queryBuilder.select().getMany()

        } else if (yearbool) {

            var prevYear: string = `${year - 1}-12-31Z`
            var nextYear: string = `${year + 1}-01-01Z`

            var prev: Date = new Date(prevYear);
            var next: Date = new Date(nextYear);

            const queryBuilder = this.transactionRepository.createQueryBuilder("personal_transaction");
            queryBuilder.andWhere('personal_transaction.creatorId = :creatorID', { creatorID });
            queryBuilder.andWhere('personal_transaction.date > :prev', { prev });
            queryBuilder.andWhere('personal_transaction.date < :next', { next });
            queryBuilder.orderBy('personal_transaction.date', 'DESC');

            return queryBuilder.select().getMany()

        }

    }

    async update(updatePersonalTransactionInput: UpdatePersonalTransactionInput) {

        const transaction = await this.transactionRepository.findOneBy({ transactionID: updatePersonalTransactionInput.transactionID });

        if (updatePersonalTransactionInput.Amount) {
            transaction.Amount = updatePersonalTransactionInput.Amount
        }
        if (updatePersonalTransactionInput.category) {
            transaction.category = updatePersonalTransactionInput.category
        }
        if (updatePersonalTransactionInput.date) {
            transaction.date = updatePersonalTransactionInput.date
            transaction.month = updatePersonalTransactionInput.date.toLocaleString('default', { month: 'long' });
        }

        if (updatePersonalTransactionInput.location) {
            transaction.location = updatePersonalTransactionInput.location
        }

        if (updatePersonalTransactionInput.paymentType) {
            transaction.paymentType = updatePersonalTransactionInput.paymentType
        }

        if (updatePersonalTransactionInput.transaction) {
            transaction.transaction = updatePersonalTransactionInput.transaction
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


    deleteAllTransactions(id: string) {
        return this.transactionRepository.delete({ creatorId: id });
    }

    async getStats(id: string) {
        const array = await this.transactionRepository.findBy({ creatorId: id })

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
        let SavingPercentage = 0;
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

}
