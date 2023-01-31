import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import TransactionsRepository from '../../adapters/repositories/transactions.repository';
import { Either, left, right } from '../../shared/either';
import CreateTransactionDto from '../dto/create-transaction.dto';
import ReturnTransactionDto from '../dto/return-transaction.dto';
import Transaction from '../entities/transactions.entity';
import FindError from '../errors/find-error';
import InsertionError from '../errors/insert-error';
import InvalidTransactionError from '../errors/invalid-transaction-error';
import InvalidTransactionRowError from '../errors/invalid-transaction-row-error';
import TransactionExtension from '../extension/transaction.extension';
import { ITransactionRepository } from '../repositories/transaction-repository.interface';


@Injectable()
export class TransactionsService {
  constructor(@InjectRepository(TransactionsRepository) private transactionsRepository: ITransactionRepository) {
  }


  async getAllTransactions(): Promise<Either<FindError, ReturnTransactionDto>>{
    const transactionsOrError = await this.transactionsRepository.getAll()
    if (transactionsOrError.isLeft()){
      return left(transactionsOrError.value)
    }
    const returnTransactionsDto = new ReturnTransactionDto()
    returnTransactionsDto.transaction = transactionsOrError.value
    returnTransactionsDto.message = "Transactions load with success"
    
    return right(returnTransactionsDto)
  }

  async processAndSaveTransactions(transactions: string): Promise<Either<InsertionError | InvalidTransactionRowError | InvalidTransactionError, ReturnTransactionDto>> {
    const processedTransactionsOrError = await this.processTransactions(transactions)

    if (processedTransactionsOrError.isLeft()) {
      return left(processedTransactionsOrError.value);
    }
    return right(processedTransactionsOrError.value)
  }

  async processTransactions(rawTransactions: string): Promise<Either<InsertionError | InvalidTransactionRowError | InvalidTransactionError, ReturnTransactionDto>>{
    const transactions = rawTransactions.split('\n')

    const transactionsRowOrError = TransactionExtension.toTransactionsRowDto(transactions)
    
    if (transactionsRowOrError.isLeft()){
      return left(transactionsRowOrError.value)
    }
    
    const transactionsDtoOrError = TransactionExtension.toTransactionsDto(transactionsRowOrError.value)

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
    const transactionOrError = await this.transactionsRepository.saveTransactions(createTransactionDto);

    if (transactionOrError.isLeft()) {
      return left(transactionOrError.value);
    }

    const returnTransactionsDto = new ReturnTransactionDto()
    returnTransactionsDto.transaction = transactionOrError.value
    returnTransactionsDto.message = "Transactions registered with success"
    
    return right(returnTransactionsDto)
    
  }

}
