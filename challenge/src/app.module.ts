import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionsModule } from './configs/transactions.module';
import { typeOrmConfig } from './configs/typeorm.config';
import { ConfigModule } from '@nestjs/config';
import { DataSource } from 'typeorm';

@Module({
  imports: [ConfigModule.forRoot({isGlobal: true}), TypeOrmModule.forRoot(typeOrmConfig), TransactionsModule],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}

