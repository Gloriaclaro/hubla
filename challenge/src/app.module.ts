import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './configs/typeorm.config';
import { TransactionsModule } from './transactions/transactions.module'

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), TransactionsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}