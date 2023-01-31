import { Either, left, right } from '../../shared/either';
import CreateTransactionRowDto from '../dto/create-transaction-row.dto';
import CreateTransactionDto from '../dto/create-transaction.dto';
import Transaction from '../entities/transactions.entity';
import InvalidTransactionError from '../errors/invalid-transaction-error';
import InvalidTransactionRowError from '../errors/invalid-transaction-row-error';

class TransactionExtension {
  static toTransactionsRowDto(
    transactions: Array<string>,
  ): Either<InvalidTransactionRowError, Array<CreateTransactionRowDto>> {
    const transactionRowsDto = [];
    for (var transaction in transactions) {
      var transactionRowDto = TransactionExtension.toTransactionRowDto(
        transactions[transaction],
      );
      if (transactionRowDto.isLeft()) {
        return left(transactionRowDto.value);
      }
      transactionRowsDto.push(transactionRowDto.value);
    }
    return right(transactionRowsDto);
  }

  static toTransactionRowDto(
    transaction: string,
  ): Either<InvalidTransactionRowError, CreateTransactionRowDto> {
    const transactionDtoOrError = CreateTransactionRowDto.create(transaction);

    if (transactionDtoOrError.isLeft()) {
      return left(transactionDtoOrError.value);
    }

    return right(transactionDtoOrError.value);
  }

  static toTransactionsDto(
    transactions: Array<CreateTransactionRowDto>,
  ): Either<InvalidTransactionError, Array<CreateTransactionDto>> {
    const transactionsDto = [];
    for (var transaction in transactions) {
      var transactionDto = TransactionExtension.toTransactionDto(
        transactions[transaction],
      );
      if (transactionDto.isLeft()) {
        return left(transactionDto.value);
      }
      transactionsDto.push(transactionDto.value);
    }
    return right(transactionsDto);
  }

  static toTransactionDto(
    transaction: CreateTransactionRowDto,
  ): Either<InvalidTransactionError, CreateTransactionDto> {
    const type = transaction.row.substring(0, 1);
    const date = new Date(Date.parse(transaction.row.substring(1, 26)));
    const product = transaction.row.substring(26, 56).trim();
    const price = parseInt(transaction.row.substring(57, 66));
    const seller = transaction.row.substring(66, 86).trim();

    const transactionDtoOrError = CreateTransactionDto.create(
      type,
      date,
      product,
      price,
      seller,
    );

    if (transactionDtoOrError.isLeft()) {
      return left(transactionDtoOrError.value);
    }

    return right(transactionDtoOrError.value);
  }

  static toTransactionsEntity(
    transactions: Array<CreateTransactionDto>,
  ): Array<Transaction> {
    const transactionsEntity = transactions.map(
      TransactionExtension.toTransactionEntity,
    );
    return transactionsEntity;
  }

  static toTransactionEntity(transaction: CreateTransactionDto): Transaction {
    const { type, date, product, price, seller } = transaction;

    const transactionEntity = new Transaction();

    transactionEntity.type = type;
    transactionEntity.date = date;
    transactionEntity.product = product;
    transactionEntity.price = price;
    transactionEntity.seller = seller;

    return transactionEntity;
  }
}

export default TransactionExtension;
