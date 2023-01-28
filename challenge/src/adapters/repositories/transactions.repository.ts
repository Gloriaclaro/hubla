import { Repository, DataSource } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { ITransactionRepository } from '../../domain/repositories/transactionRepository.interface';
import { Transaction } from '../../domain/entities/transactions.entity';
import CreateTransactionDto from 'src/domain/dto/create-transaction.dto';
import TransactionExtension from 'src/domain/extension/transaction.extension';
import { create } from 'domain';
import { Either, left, right } from 'src/shared/either';
import { InsertionError } from 'src/domain/errors/insert-error';

@Injectable()
class TransactionsRepository implements ITransactionRepository{
    constructor(@InjectRepository(Transaction)  private readonly transactionsRepository: Repository<Transaction>) {}
    
    async getAll(): Promise<Transaction[]>{
      return this.transactionsRepository.find({})
    }

    async save(createTransactionDtos: Array<CreateTransactionDto>): Promise<Either<InsertionError, Array<Transaction>>> {

        const transactionsEntities = TransactionExtension.toTransactionsEntity(createTransactionDtos)

        const transactions = await this.transactionsRepository.save(transactionsEntities)
        if (transactions) {
          return right(transactions)
        }
        return left(new InsertionError)
    }
}

export default TransactionsRepository