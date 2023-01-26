import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { ReturnTransactionDto } from './dto/return-transaction.dto';
import { Transaction } from './transactions.entity';
import { TransactionsRepository } from './transactions.repository';


@Injectable()
export class TransactionsService {
  constructor(private readonly transactionsRepository: TransactionsRepository) {}


  getAllTransactions(): Promise<Transaction[]>{
    return this.transactionsRepository.getTransactions()
  }

  async processAndSaveTransactions(file: string): Promise<void | PromiseSettledResult<ReturnTransactionDto>[]>{
    let rawTransactions = Buffer.from(file['file'], 'base64').toString('utf8')
    return this.processTransactions(rawTransactions)
    
  }

  async processTransactions(rawTransactions: string): Promise<void | PromiseSettledResult<ReturnTransactionDto>[]>{
    let transactions = rawTransactions.split('\n')

    let valid_transactions = transactions.filter(element => element.length > 76)
    
    let transactionObjectList = valid_transactions.map(function(transaction) {
        return {
        "type": transaction.substring(0, 1),
        "date": new Date(Date.parse(transaction.substring(1, 26))),
        "product": transaction.substring(26, 56).trim(),
        "price": parseInt(transaction.substring(57, 66)),
        "seller": transaction.substring(66, 85),
        }
      });
    
      
    const transactionsReturnDtos = Promise.allSettled(
      transactionObjectList.map((transaction) => this.createTransaction(transaction))
    )
      .then((result) => {
        return result
      })
      .catch((error) => {
        console.log(error);
      });

    return transactionsReturnDtos;
  }


  async createTransaction(createTransactionDto: CreateTransactionDto): Promise<ReturnTransactionDto> {
    const transaction = await this.transactionsRepository.saveTransaction(createTransactionDto);
    return {
      transaction,
      message: 'Transaction registered',
    };
  }

}
