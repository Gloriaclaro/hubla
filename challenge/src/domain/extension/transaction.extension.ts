import { Either, left, right } from "src/shared/either";
import CreateTransactionDto from "../dto/create-transaction.dto";
import { Transaction } from "../entities/transactions.entity";
import { InvalidTransactionError } from "../errors/invalid-transaction-error";

class TransactionExtension {

    static toTransactionsDto(transactions: Array<string>): Either<InvalidTransactionError, Array<CreateTransactionDto>>{
      const transactionsDto = []
      for (var transaction in transactions){
        var transactionDto = TransactionExtension.toTransactionDto(transactions[transaction])
        if (transactionDto.isLeft()){
          return left(transactionDto.value)
        }
        transactionsDto.push(transactionDto.value)
      }
      return right(transactionsDto)
    }

    static toTransactionDto(transaction: string): Either<InvalidTransactionError, CreateTransactionDto> {
      const type = transaction.substring(0, 1);
      const date = new Date(Date.parse(transaction.substring(1, 26)));
      const product = transaction.substring(26, 56).trim()
      const price = parseInt(transaction.substring(57, 66));
      const seller = transaction.substring(66, 86);

      const transactionDtoOrError =  CreateTransactionDto.create(type, date, product, price, seller)
      
      if (transactionDtoOrError.isLeft()){
        return left(transactionDtoOrError.value)
      }
        
      
      return right(transactionDtoOrError.value)
    }

    static toTransactionsEntity(transactions: Array<CreateTransactionDto>): Array<Transaction>{
      const transactionsEntity = transactions.map(TransactionExtension.toTransactionEntity);
      return transactionsEntity
    }

    static toTransactionEntity(transaction: CreateTransactionDto): Transaction {
      const { type, date, product, price, seller } = transaction

      const transactionEntity =  Transaction.create()
      transactionEntity.type = type
      transactionEntity.date = date
      transactionEntity.product = product
      transactionEntity.price = price
      transactionEntity.seller = seller

      
      return transactionEntity
    }
    
}

export default TransactionExtension
