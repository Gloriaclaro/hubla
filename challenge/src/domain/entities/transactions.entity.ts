import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column({ nullable: false, type: 'varchar', length: 1 })
  type: string;

  @ApiProperty()
  @Column({ nullable: false })
  date: Date;

  @ApiProperty()
  @Column({ nullable: false, type: 'varchar', length: 30 })
  product: string;

  @ApiProperty()
  @Column({ nullable: false })
  price: number;
  
  @ApiProperty()
  @Column({ nullable: false, type: 'varchar', length: 20 })
  seller: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
export default Transaction;
