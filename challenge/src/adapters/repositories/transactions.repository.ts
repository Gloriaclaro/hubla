import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { ITransactionRepository } from '../../domain/repositories/transactionRepository.interface';
import CreateTransactionDto from 'src/domain/dto/create-transaction.dto';
import TransactionExtension from 'src/domain/extension/transaction.extension';
import { Either, left, right } from 'src/shared/either';
import Transaction from 'src/domain/entities/transactions.entity';
import FindError from 'src/domain/errors/find-error';
import InsertionError from 'src/domain/errors/insert-error';

@Injectable()
class TransactionsRepository implements ITransactionRepository {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionsRepository: Repository<Transaction>,
  ) {}

  async getAll(): Promise<Either<FindError, Promise<Array<Transaction>>>> {
    const transactions = this.transactionsRepository.find({});
    if (!transactions) {
      return left(new FindError());
    }
    return right(transactions);
  }

  async save(
    createTransactionDtos: Array<CreateTransactionDto>,
  ): Promise<Either<InsertionError, Array<Transaction>>> {
    const transactionsEntities = TransactionExtension.toTransactionsEntity(
      createTransactionDtos,
    );

    const transactions = await this.transactionsRepository.save(
      transactionsEntities,
    );
    if (transactions) {
      return right(transactions);
    }
    return left(new InsertionError());
  }
}

export default TransactionsRepository;
