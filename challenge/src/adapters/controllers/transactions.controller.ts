import  ReturnTransactionDto  from '../../domain/dto/return-transaction.dto';
import { Body, Controller, Get, UploadedFile, UseInterceptors } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBody, ApiConsumes, ApiOperation, ApiResponse, getSchemaPath, refs } from '@nestjs/swagger';
import { TransactionsService } from '../../domain/services/transactions.service';
import ReturnErrorDto from '../../domain/dto/return-error.dto';

@Controller()
class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Get('transactions')
  @ApiOperation({ summary: 'Get all transactions' })
  @ApiResponse({ status: 200, description: 'Successful operation', type: ReturnTransactionDto})
  async getTransactions(): Promise<ReturnErrorDto | ReturnTransactionDto> {
    const transactionsOrError =
      await this.transactionsService.getAllTransactions();
    if (transactionsOrError.isLeft()) {
      const errorResponse = new ReturnErrorDto
      errorResponse.error = transactionsOrError.value.name
      errorResponse.message = transactionsOrError.value.message
      return errorResponse
    }
    return transactionsOrError.value
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiBody({ schema: { type: 'object', properties: { file: { type: 'string', format: 'binary'}}}})
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Receive a file, process and save in postgres. Return all registered transactions' })
  @ApiResponse({ status: 200, description: 'Successful operation', type: ReturnTransactionDto})
  async uploadFileTest(@UploadedFile() @Body() file: Express.Multer.File): Promise<ReturnErrorDto | ReturnTransactionDto>{
    const fileContent = file.buffer.toString();
    const transactionsOrError =
      await this.transactionsService.processAndSaveTransactions(fileContent);

    if (transactionsOrError.isLeft()) {
      const errorResponse = new ReturnErrorDto
      errorResponse.error = transactionsOrError.value.name
      errorResponse.message = transactionsOrError.value.message
      return errorResponse
    }
    return transactionsOrError.value;
  }
}
export default TransactionsController;
