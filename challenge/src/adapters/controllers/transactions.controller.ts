import { Body, Controller, Get } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { Transaction } from 'src/domain/entities/transactions.entity';
import { TransactionsService } from '../../domain/services/transactions.service';


@Controller()
class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

    @Get('transactions')
    async getTransactions(): Promise<Array<Transaction>> {
    return this.transactionsService.getAllTransactions();
    }

    @Post('upload')
    async uploadFile(@Body() file: string) {
      const transactionsOrError = await this.transactionsService.processAndSaveTransactions(file)
      if (transactionsOrError.isLeft()){
        return {"Error": transactionsOrError}
      }
      return transactionsOrError.value
    }
}
export default TransactionsController
