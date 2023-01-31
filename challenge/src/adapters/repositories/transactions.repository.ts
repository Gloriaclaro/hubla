import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { ITransactionRepository } from '../../domain/repositories/transaction-repository.interface';
import CreateTransactionDto from '../../domain/dto/create-transaction.dto';
import TransactionExtension from '../../domain/extension/transaction.extension';
import { Either, left, right } from '../../shared/either';
import Transaction from '../../domain/entities/transactions.entity';
import FindError from '../../domain/errors/find-error';
import InsertionError from '../../domain/errors/insert-error';


@Injectable()
class TransactionsRepository extends Repository<Transaction> implements ITransactionRepository {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionsRepository: Repository<Transaction>,
  ) {
    super(transactionsRepository.target, transactionsRepository.manager, transactionsRepository.queryRunner);
  }

  async getAll(): Promise<Either<FindError, Array<Transaction>>> {
    try {
      const transactions = await this.transactionsRepository.find({});
      return right(transactions);
    }catch (error){
      return left(new FindError());
    }
  }

  async saveTransactions(
    createTransactionDtos: Array<CreateTransactionDto>,
  ): Promise<Either<InsertionError, Array<Transaction>>> {
    try {
      const transactionsEntities = TransactionExtension.toTransactionsEntity(
        createTransactionDtos,
      );
      const transactions = await this.transactionsRepository.save(
        transactionsEntities,
      );
      if (transactions) {
        return right(transactions);
      }

    } catch(error) {
      return left(new InsertionError());
    } 
  }
}


export default TransactionsRepository;
