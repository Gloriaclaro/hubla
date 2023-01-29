import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
class Transaction extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, type: 'varchar', length: 1 })
  type: string;

  @Column({ nullable: false })
  date: Date;

  @Column({ nullable: false, type: 'varchar', length: 30 })
  product: string;

  @Column({ nullable: false })
  price: number;

  @Column({ nullable: false, type: 'varchar', length: 20 })
  seller: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
export default Transaction;
