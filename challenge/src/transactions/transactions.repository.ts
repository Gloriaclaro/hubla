import { Repository, DataSource } from 'typeorm';
import { Transaction } from './transactions.entity';
import { InjectRepository } from '@nestjs/typeorm';

import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Injectable, InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class TransactionsRepository {
    constructor(@InjectRepository(Transaction)  private readonly transactionsRepository: Repository<Transaction>) {}
    
    async getTransactions(): Promise<Transaction[]>{
      return this.transactionsRepository.find({})
    }

    async saveTransaction(createTransactionDto: CreateTransactionDto): Promise<Transaction> {
        const { type, date, product, price, seller } = createTransactionDto;
    
        const transction = this.transactionsRepository.create();
        transction.type = type
        transction.date = date
        transction.product = product
        transction.price = price
        transction.seller = seller

        try {
          await transction.save();
          return transction;
        } catch (error) {
            throw new InternalServerErrorException(
              'Error inserting data into database',
            );
          }
    }
}
