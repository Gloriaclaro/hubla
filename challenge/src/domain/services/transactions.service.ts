import { Injectable, Logger } from '@nestjs/common';
import TransactionsRepository from 'src/adapters/repositories/transactions.repository';
import { ReturnTransactionDto } from 'src/domain/dto/return-transaction.dto';
import { Transaction } from 'src/domain/entities/transactions.entity';
import { Either, left, right } from 'src/shared/either';
import CreateTransactionDto from '../dto/create-transaction.dto';
import { FindError } from '../errors/find-error';
import { InsertionError } from '../errors/insert-error';
import { InvalidTransactionError } from '../errors/invalid-transaction-error';
import TransactionExtension from '../extension/transaction.extension';


@Injectable()
export class TransactionsService {
  constructor(private readonly transactionsRepository: TransactionsRepository) {}


  async getAllTransactions(): Promise<Either<FindError, Promise<Transaction[]>>>{
    const transactionsOrError = await this.transactionsRepository.getAll()
    if (transactionsOrError.isLeft()){
      return left(transactionsOrError.value)
    }
    return right(transactionsOrError.value)
  }

  async processAndSaveTransactions(transactions: string): Promise<Either<InsertionError | InvalidTransactionError, ReturnTransactionDto>> {
    const processedTransactionsOrError = await this.processTransactions(transactions)

    if (processedTransactionsOrError.isLeft()) {
      return left(processedTransactionsOrError.value);
    }
    return right(processedTransactionsOrError.value)
  }

  async processTransactions(rawTransactions: string): Promise<Either<InsertionError | InvalidTransactionError, ReturnTransactionDto>>{
    const transactions = rawTransactions.split('\n')

    const transactionsDtoOrError = TransactionExtension.toTransactionsDto(transactions)

    if (transactionsDtoOrError.isLeft()){
      return left(transactionsDtoOrError.value)
    }
    
    const registedTransactionsOrError = await this.saveTransactions(transactionsDtoOrError.value)
    
    if (registedTransactionsOrError.isLeft()) {
      return left(registedTransactionsOrError.value);
    }

    return right(registedTransactionsOrError.value)
  }


  async saveTransactions(createTransactionDto: Array<CreateTransactionDto>): Promise<Either<InsertionError, ReturnTransactionDto>> {
    const transactionOrError = await this.transactionsRepository.save(createTransactionDto);
    
    if (transactionOrError.isLeft()) {
      return left(transactionOrError.value);
    }

    const returnTransactionsDto = new ReturnTransactionDto()
    returnTransactionsDto.transaction = transactionOrError.value
    returnTransactionsDto.message = "Transactions registered with success"
    
    return right(returnTransactionsDto)
    
  }

}