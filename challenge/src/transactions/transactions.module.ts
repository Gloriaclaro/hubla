import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionsRepository } from './transactions.repository';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { Transaction } from './transactions.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction])],
    providers: [TransactionsService, TransactionsRepository],
    controllers: [TransactionsController],
})
export class TransactionsModule {}