import { Either, left, right } from 'src/shared/either';
import { InvalidTransactionError } from '../errors/invalid-transaction-error';

class CreateTransactionDto {
    type: string;
    date: Date;
    product: string;
    price: number;
    seller: string;

    private constructor(type: string, date: Date, product: string, price: number, seller: string) {
        this.type = type
        this.date = date
        this.product = product
        this.price = price
        this.seller = seller
    }

    static create(type: string, date: Date, product: string, price: number, seller: string):  Either<InvalidTransactionError, CreateTransactionDto>{
        if(!CreateTransactionDto.validateType(type)) {
            return left(new InvalidTransactionError("Type"))
        }

        if(!CreateTransactionDto.validateProduct(product)) {
            return left(new InvalidTransactionError("Product"))
        }

        if(!CreateTransactionDto.validateDate(date)) {
            return left(new InvalidTransactionError("Date"))
        }

        if(!CreateTransactionDto.validatePrice(price)) {
            return left(new InvalidTransactionError("Price"))
        }

        if(!CreateTransactionDto.validateSeller(seller)) {
            return left(new InvalidTransactionError("Seller"))
        }

        return right(new CreateTransactionDto(type, date, product, price, seller))

    }

    static validateType(type: string): boolean {
        if(!type) {
            return false
        }

        if(type.trim().length > 1)
        {
            return false;
        }

        return true;
    }

    static validateDate(date: Date): boolean {
        if(!date){
            return false
        }
        return true
    }

    static validateProduct(product: string): boolean {
        if(!product) {
            return false
        }

        if(product.trim().length > 25)
        {
            return false;
        }

        return true;
    }

    static validatePrice(price: number): boolean {
        if(!price) {
            return false
        }
        return true
    }

    static validateSeller(seller: string): boolean {
        if(!seller) {
            return false
        }

        if(seller.trim().length > 20)
        {
            return false;
        }
        
        return true
    }
}

export default CreateTransactionDto;