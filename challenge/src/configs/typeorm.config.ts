import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from 'dotenv';

config()

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: 5432,
  username: 'admin',
  password: 'admin',
  database: 'postgres',
  entities: [__dirname + '/../**/*.entity.{js,ts}'],
  synchronize: true,

};
