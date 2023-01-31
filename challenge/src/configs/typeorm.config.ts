import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from 'dotenv';
import Transaction from '../domain/entities/transactions.entity';

config()

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: 5432,
  username: 'admin',
  password: 'admin',
  database: 'postgres',
  entities: [Transaction],
  synchronize: true,
  autoLoadEntities: true,
};
