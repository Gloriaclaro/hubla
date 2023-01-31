import  InsertionError from '../../domain/errors/insert-error';
import { Either, left, right } from '../../shared/either';
import ReturnTransactionDto from "../../domain/dto/return-transaction.dto";
import { TransactionsService } from "../../domain/services/transactions.service";
import TransactionsController from "./transactions.controller";
import { Test } from '@nestjs/testing';
import FindError from '../../domain/errors/find-error';
import Transaction from '../../domain/entities/transactions.entity';
import InvalidTransactionError from '../../domain/errors/invalid-transaction-error';
import { ITransactionRepository } from '../../domain/repositories/transactionRepository.interface';
import { TypeOrmModule } from '@nestjs/typeorm';
import TransactionsRepository from '../repositories/transactions.repository';
import CreateTransactionDto from '../../domain/dto/create-transaction.dto';
import TransactionExtension from '../../domain/extension/transaction.extension';


class MemoryTransactionsRepository implements ITransactionRepository {

  private table: Array<Transaction>

  constructor(table: Array<Transaction>){
    this.table = table;
  }

  async getAll(): Promise<Either<FindError, Array<Transaction>>> {
    return Promise.resolve(right(this.table));
  }

  async save(
    createTransactionDtos: Array<CreateTransactionDto>,
  ): Promise<Either<InsertionError, Array<Transaction>>> {
    try {
      const transactionsEntities = TransactionExtension.toTransactionsEntity(
        createTransactionDtos,
      );
      this.table = [...this.table, ...transactionsEntities]
      if (transactionsEntities) {
        return right(transactionsEntities);
      }

    } catch(error) {
      return left(new InsertionError());
    } 
  }
}

// export const TypeOrmSQLITETestingModule = () => [
//   TypeOrmModule.forRoot({
//     type: 'better-sqlite3',
//     database: ':memory:',
//     dropSchema: true,
//     entities: [Transaction],
//     synchronize: true,
//   }),
//   TypeOrmModule.forFeature([Transaction]),
// ];


// const mockGetAllTransactions = async ():  Promise<Either<FindError, ReturnTransactionDto>> =>{
//     const mock_success = true
//     const returnTransactionsDto = new ReturnTransactionDto()
//     returnTransactionsDto.transaction = []
//     returnTransactionsDto.message = "Transactions load with success"  
    
//     if (!mock_success) {
//         return left(new FindError());
//       }
    
//     return right(returnTransactionsDto);

// }

// const mockprocessAndSaveTransactions = async ():  Promise<Either<InsertionError | InvalidTransactionError, ReturnTransactionDto>> =>{
//   const mock_success = true
//   const returnTransactionsDto = new ReturnTransactionDto()
//   returnTransactionsDto.transaction = []
//   returnTransactionsDto.message = "Transactions registered with success"  
  
//   if (!mock_success) {
//       return left(new InsertionError());
//     }
  
//   return right(returnTransactionsDto);

// }

describe('TransactionsController', () => {
  let transactionsController: TransactionsController;
  let transactionsService: TransactionsService;
  let transactionsRepository: ITransactionRepository;

  beforeEach(async () => {
    const seed = []
    transactionsRepository = new MemoryTransactionsRepository(seed);
    transactionsService = new TransactionsService(transactionsRepository);
    transactionsController = new TransactionsController(transactionsService)
  });

  describe('getTransactions', () => {
    it('should return ReturnTransactionDto with an empty list', async () => {
      const emptyTransactionsDto = new ReturnTransactionDto()
      emptyTransactionsDto.transaction = []
      emptyTransactionsDto.message = "Transactions load with success"  
      
      const transactions = await transactionsController.getTransactions()
      expect(transactions).toStrictEqual(emptyTransactionsDto)
    });
  });

  describe('uploadFile', () => {
    it('should receive a file and return an ReturnTransactionDto', async () => {

      //   const returnTransactionsDto = new ReturnTransactionDto()
      //   returnTransactionsDto.transaction = []
      //   returnTransactionsDto.message = "Transactions registered with success"  
      //   const file: Express.Multer.File = {
      //     originalname: 'file.csv',
      //     mimetype: 'text/csv',
      //     path: 'something',
      //     buffer: Buffer.from('test'),
      //     fieldname: '',
      //     encoding: '',
      //     size: 0,
      //     stream: new Readable,
      //     destination: '',
      //     filename: ''
      //   };        
    
      // jest.spyOn(transactionsService, 'processAndSaveTransactions').mockImplementation(() => mockprocessAndSaveTransactions());

      // expect(await transactionsController.uploadFile(file)).toStrictEqual(returnTransactionsDto);
    });
  });
});