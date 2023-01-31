import Transaction from '../src/domain/entities/transactions.entity';
import { ITransactionRepository } from '../src/domain/repositories/transaction-repository.interface';
import TransactionsController from '../src/adapters/controllers/transactions.controller';
import { TransactionsService } from '../src/domain/services/transactions.service';
import ReturnTransactionDto from '../src/domain/dto/return-transaction.dto';
import MemoryTransactionsRepository from './repositories/in-memory.transactions.repository';
import { Readable } from 'typeorm/platform/PlatformTools';
import ReturnErrorDto from '../src/domain/dto/return-error.dto';
import InvalidTransactionRowError from '../src/domain/errors/invalid-transaction-row-error';
import InvalidTransactionError from '../src/domain/errors/invalid-transaction-error';

describe('TransactionsController', () => {
  let transactionsController: TransactionsController;
  let transactionsService: TransactionsService;
  let transactionsRepository: ITransactionRepository;

  beforeEach(async () => {
    const seed = [];
    transactionsRepository = new MemoryTransactionsRepository(seed);
    transactionsService = new TransactionsService(transactionsRepository);
    transactionsController = new TransactionsController(transactionsService);
  });

  describe('getTransactions', () => {
    it('should return ReturnTransactionDto with an empty list', async () => {
      const emptyTransactionsDto = new ReturnTransactionDto();
      emptyTransactionsDto.transaction = [];
      emptyTransactionsDto.message = 'Transactions load with success';

      const transactions = await transactionsController.getTransactions();
      expect(transactions).toStrictEqual(emptyTransactionsDto);
    });
  });

  describe('uploadFile', () => {
    it('should receive a correct file and return an ReturnTransactionDto', async () => {
      const file: Express.Multer.File = {
        originalname: 'file.csv',
        mimetype: 'text/csv',
        path: 'something',
        buffer: Buffer.from(
          '12022-01-15T19:20:30-03:00CURSO DE BEM-ESTAR            0000012750JOSE CARLOS ',
        ),
        fieldname: '',
        encoding: '',
        size: 0,
        stream: new Readable(),
        destination: '',
        filename: '',
      };

      const returnTransactionsDto = new ReturnTransactionDto();
      const transaction = new Transaction();
      transaction.type = '1';
      transaction.date = new Date(Date.parse('2022-01-15T19:20:30-03:00'));
      transaction.product = 'CURSO DE BEM-ESTAR';
      transaction.price = 12750;
      transaction.seller = 'JOSE CARLOS';

      returnTransactionsDto.transaction = [transaction];
      returnTransactionsDto.message = 'Transactions registered with success';

      const transactions = await transactionsController.uploadFile(file);
      expect(transactions).toStrictEqual(returnTransactionsDto);
    });
  });

  describe('uploadFile', () => {
    it('should receive a empty file and return an ReturnErrorDto of type InvalidTransactionRowError', async () => {
      const file: Express.Multer.File = {
        originalname: 'file.csv',
        mimetype: 'text/csv',
        path: 'something',
        buffer: Buffer.from(''),
        fieldname: '',
        encoding: '',
        size: 0,
        stream: new Readable(),
        destination: '',
        filename: '',
      };

      const returnError = new ReturnErrorDto();
      const error = new InvalidTransactionRowError();

      returnError.error = error.name;
      returnError.message = error.message;

      const transactions = await transactionsController.uploadFile(file);
      expect(transactions).toStrictEqual(returnError);
    });
  });

  describe('uploadFile', () => {
    it('should receive a empty file and return an ReturnErrorDto of type InvalidTransactionError(Date)', async () => {
      const file: Express.Multer.File = {
        originalname: 'file.csv',
        mimetype: 'text/csv',
        path: 'something',
        buffer: Buffer.from(
          '2022-01-15T19:20:30-03:00CURSO DE BEM-ESTAR            0000012750JOSE CARLOS ',
        ),
        fieldname: '',
        encoding: '',
        size: 0,
        stream: new Readable(),
        destination: '',
        filename: '',
      };

      const returnError = new ReturnErrorDto();
      const error = new InvalidTransactionError('Date');

      returnError.error = error.name;
      returnError.message = error.message;

      const transactions = await transactionsController.uploadFile(file);
      expect(transactions).toStrictEqual(returnError);
    });
  });

  describe('uploadFile', () => {
    it('should receive a empty file and return an ReturnErrorDto of type InvalidTransactionError(Product)', async () => {
      const file: Express.Multer.File = {
        originalname: 'file.csv',
        mimetype: 'text/csv',
        path: 'something',
        buffer: Buffer.from(
          '12022-01-15T19:20:30-03:000000000000000000000000000000000000000000012750JOSE CARLOS ',
        ),
        fieldname: '',
        encoding: '',
        size: 0,
        stream: new Readable(),
        destination: '',
        filename: '',
      };

      const returnError = new ReturnErrorDto();
      const error = new InvalidTransactionError('Product');

      returnError.error = error.name;
      returnError.message = error.message;

      const transactions = await transactionsController.uploadFile(file);
      expect(transactions).toStrictEqual(returnError);
    });
  });

  describe('uploadFile', () => {
    it('should receive a empty file and return an ReturnErrorDto of type InvalidTransactionError(Price)', async () => {
      const file: Express.Multer.File = {
        originalname: 'file.csv',
        mimetype: 'text/csv',
        path: 'something',
        buffer: Buffer.from(
          '12022-01-15T19:20:30-03:00CURSO DE BEM-ESTAR            teststringJOSE CARLOS ',
        ),
        fieldname: '',
        encoding: '',
        size: 0,
        stream: new Readable(),
        destination: '',
        filename: '',
      };

      const returnError = new ReturnErrorDto();
      const error = new InvalidTransactionError('Price');

      returnError.error = error.name;
      returnError.message = error.message;

      const transactions = await transactionsController.uploadFile(file);
      expect(transactions).toStrictEqual(returnError);
    });
  });

  describe('uploadFile', () => {
    it('should receive a empty file and return an ReturnErrorDto of type InvalidTransactionError(Seller)', async () => {
      const file: Express.Multer.File = {
        originalname: 'file.csv',
        mimetype: 'text/csv',
        path: 'something',
        buffer: Buffer.from(
          '2022-01-15T19:20:30-03:00CURSO DE BEM-ESTAR            00000127500001239874389809000',
        ),
        fieldname: '',
        encoding: '',
        size: 0,
        stream: new Readable(),
        destination: '',
        filename: '',
      };

      const returnError = new ReturnErrorDto();
      const error = new InvalidTransactionError('Date');

      returnError.error = error.name;
      returnError.message = error.message;

      const transactions = await transactionsController.uploadFile(file);
      expect(transactions).toStrictEqual(returnError);
    });
  });
});
