import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import Transaction from '../domain/entities/transactions.entity';
import TransactionsController from '../adapters/controllers/transactions.controller';
import TransactionsRepository from '../adapters/repositories/transactions.repository';
import { TransactionsService } from '../domain/services/transactions.service';

@Module({
    imports: [TypeOrmModule.forFeature([Transaction])],
    providers: [TransactionsService, TransactionsRepository],
    controllers: [TransactionsController],
})
export class TransactionsModule {}