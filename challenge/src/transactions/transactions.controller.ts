import { Body, Controller, Get , UploadedFile, UseInterceptors} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { Post } from '@nestjs/common';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { throwIfEmpty } from 'rxjs';
import { Transaction } from './transactions.entity';



@Controller()
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

    @Get('transactions')
    async getHello(): Promise<Transaction[]> {
    return this.transactionsService.getAllTransactions();
    }

    @Post('upload')
    uploadFile(@Body() file: string) {
      return this.transactionsService.processAndSaveTransactions(file)
    }
    
    // @Post('upload')
    // @UseInterceptors(FileInterceptor('file'))
    // uploadFile(@UploadedFile() file: Express.Multer.File) {
    // console.log(file);
    // }

}
