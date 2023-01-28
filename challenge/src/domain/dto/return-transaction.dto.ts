import { Transaction } from '../../domain/entities/transactions.entity';

export class ReturnTransactionDto {
  transaction: Array<Transaction>;
  message: string;
}