import { Transaction } from '../transactions.entity';

export class ReturnTransactionDto {
  transaction: Transaction;
  message: string;
}