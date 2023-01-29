import  InsertionError from '../../domain/errors/insert-error';
import  TransactionsRepository  from '../../adapters/repositories/transactions.repository';
import { Either, left, right } from './../../shared/either';
import ReturnTransactionDto from "../../domain/dto/return-transaction.dto";
import { TransactionsService } from "../../domain/services/transactions.service";
import TransactionsController from "./transactions.controller";
import { Test } from '@nestjs/testing';
import FindError from '../../domain/errors/find-error';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import Transaction from '../../domain/entities/transactions.entity';
import { typeOrmConfig } from '../../configs/typeorm.config';
import { Readable } from 'typeorm/platform/PlatformTools';
import InvalidTransactionError from '../../domain/errors/invalid-transaction-error';


const mockGetAllTransactions = async ():  Promise<Either<FindError, ReturnTransactionDto>> =>{
    const mock_success = true
    const returnTransactionsDto = new ReturnTransactionDto()
    returnTransactionsDto.transaction = []
    returnTransactionsDto.message = "Transactions load with success"  
    
    if (!mock_success) {
        return left(new FindError());
      }
    
    return right(returnTransactionsDto);

}

const mockprocessAndSaveTransactions = async ():  Promise<Either<InsertionError | InvalidTransactionError, ReturnTransactionDto>> =>{
  const mock_success = true
  const returnTransactionsDto = new ReturnTransactionDto()
  returnTransactionsDto.transaction = []
  returnTransactionsDto.message = "Transactions registered with success"  
  
  if (!mock_success) {
      return left(new InsertionError());
    }
  
  return right(returnTransactionsDto);

}

describe('TransactionsController', () => {
  let transactionsController: TransactionsController;
  let transactionsService: TransactionsService;
  let transactionsRepository: TransactionsRepository;


  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
        imports: [TypeOrmModule.forRoot(typeOrmConfig), TypeOrmModule.forFeature([Transaction])],
        controllers: [TransactionsController],
        providers: [TransactionsService, TransactionsRepository],
      }).compile();

      transactionsService = moduleRef.get<TransactionsService>(TransactionsService);
      transactionsRepository = moduleRef.get<TransactionsRepository>(TransactionsRepository);
      transactionsController = moduleRef.get<TransactionsController>(TransactionsController);
  });

  describe('getTransactions', () => {
    it('should return an array of cats', async () => {

        const returnTransactionsDto = new ReturnTransactionDto()
        returnTransactionsDto.transaction = []
        returnTransactionsDto.message = "Transactions load with success"  

      jest.spyOn(transactionsService, 'getAllTransactions').mockImplementation(() => mockGetAllTransactions());

      expect(await transactionsController.getTransactions()).toStrictEqual(returnTransactionsDto);
    });
  });

  describe('uploadFile', () => {
    it('should return an array of cats', async () => {

        const returnTransactionsDto = new ReturnTransactionDto()
        returnTransactionsDto.transaction = []
        returnTransactionsDto.message = "Transactions registered with success"  
        const file: Express.Multer.File = {
          originalname: 'file.csv',
          mimetype: 'text/csv',
          path: 'something',
          buffer: Buffer.from('test'),
          fieldname: '',
          encoding: '',
          size: 0,
          stream: new Readable,
          destination: '',
          filename: ''
        };        
    
      jest.spyOn(transactionsService, 'processAndSaveTransactions').mockImplementation(() => mockprocessAndSaveTransactions());

      expect(await transactionsController.uploadFile(file)).toStrictEqual(returnTransactionsDto);
    });
  });

});