import { Either } from '../../shared/either';
import CreateTransactionDto from '../dto/create-transaction.dto';
import Transaction from '../entities/transactions.entity';
import FindError from '../errors/find-error';
import InsertionError from '../errors/insert-error';


export interface ITransactionRepository {
    getAll(): Promise<Either<FindError, Promise<Array<Transaction>>>>;
    save(createTransactionDto:Array<CreateTransactionDto>):Promise<Either<InsertionError, Array<Transaction>>>;
}