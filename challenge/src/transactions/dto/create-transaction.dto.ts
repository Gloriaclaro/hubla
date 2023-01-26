import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateTransactionDto {
    @IsNotEmpty({message: 'Type is required'})
    @MaxLength(1, {message: 'Type field must contain only 1 character'})
    type: string;

    @IsNotEmpty({message: 'Date is required'})
    date: Date;

    @IsNotEmpty({message: 'Product description is required'})
    @MaxLength(30, {message: 'Product description must contain a maximum of 30 characters'})
    product: string;

    @IsNotEmpty({message: 'Price is required'})
    price: number;

    @IsNotEmpty({message: 'Seller is required'})
    @MaxLength(20, {message: 'Sellet name must contain a maximum of 20 characters'})
    seller: string;

}