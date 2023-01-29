import { Controller, Get, UploadedFile, UseInterceptors } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { TransactionsService } from '../../domain/services/transactions.service';

@Controller()
class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get('transactions')
  async getTransactions() {
    const transactionsOrError =
      await this.transactionsService.getAllTransactions();
    if (transactionsOrError.isLeft()) {
      return {
        error: transactionsOrError.value.name,
        message: transactionsOrError.value.message,
      };
    }
    return transactionsOrError.value;
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFileTest(@UploadedFile() file: Express.Multer.File) {
    const fileContent = file.buffer.toString();
    const transactionsOrError =
      await this.transactionsService.processAndSaveTransactions(fileContent);

    if (transactionsOrError.isLeft()) {
      return {
        error: transactionsOrError.value.name,
        message: transactionsOrError.value.message,
      };
    }
    return transactionsOrError.value;
  }
}
export default TransactionsController;
