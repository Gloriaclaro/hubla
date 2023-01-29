import Transaction from "../entities/transactions.entity"

class ReturnTransactionDto {
  transaction: Array<Transaction>
  message: string
}
export default ReturnTransactionDto