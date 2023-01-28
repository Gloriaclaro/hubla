import { Either } from 'src/shared/either';
import CreateTransactionDto from '../dto/create-transaction.dto';
import { Transaction } from '../entities/transactions.entity';
import { InsertionError } from '../errors/insert-error';

export interface ITransactionRepository {
    getAll(): Promise<Transaction[]>;
    save(createTransactionDto:Array<CreateTransactionDto>):Promise<Either<InsertionError, Array<Transaction>>>;
}