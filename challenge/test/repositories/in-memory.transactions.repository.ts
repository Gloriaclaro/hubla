import CreateTransactionDto from "../../src/domain/dto/create-transaction.dto";
import Transaction from "../../src/domain/entities/transactions.entity";
import FindError from "../../src/domain/errors/find-error";
import InsertionError from "../../src/domain/errors/insert-error";
import TransactionExtension from "../../src/domain/extension/transaction.extension";
import { Either, left, right } from "../../src/shared/either";
import { ITransactionRepository } from "../../src/domain/repositories/transaction-repository.interface";


class MemoryTransactionsRepository implements ITransactionRepository {
    
    private table: Array<Transaction>
    
    constructor(table: Array<Transaction>){
      this.table = table;
    }
  
    async getAll(): Promise<Either<FindError, Array<Transaction>>> {
      return Promise.resolve(right(this.table));
    }
  
    async saveTransactions(
      createTransactionDtos: Array<CreateTransactionDto>,
    ): Promise<Either<InsertionError, Array<Transaction>>> {
      try {
        const transactionsEntities = TransactionExtension.toTransactionsEntity(
          createTransactionDtos,
        );

        this.table = [...this.table, ...transactionsEntities]
        if (transactionsEntities) {
          return right(transactionsEntities);
        }
  
      } catch(error) {
        console.log(error)
        return left(new InsertionError());
      } 
    }
  }
  export default MemoryTransactionsRepository