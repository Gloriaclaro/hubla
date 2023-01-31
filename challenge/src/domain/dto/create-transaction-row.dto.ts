import { Either, left, right } from '../../shared/either';
import InvalidTransactionRowError from '../errors/invalid-transaction-row-error';

class CreateTransactionRowDto {
    row: string

    private constructor(row: string) {
        this.row = row
    }

    static create(row: string):  Either<InvalidTransactionRowError, CreateTransactionRowDto>{
        if (row.length < 67 || row.length > 86) {
            return left(new InvalidTransactionRowError())
        }
        return right(new CreateTransactionRowDto(row))
    }

}
export default CreateTransactionRowDto