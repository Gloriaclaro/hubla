import { ApiProperty } from "@nestjs/swagger"
import { IsObject } from "class-validator"
import Transaction from "../entities/transactions.entity"

class ReturnTransactionDto {
  
  @ApiProperty({ type: () => Transaction })
  @IsObject()
  transaction: Array<Transaction>

  @ApiProperty()
  message: string
}
export default ReturnTransactionDto