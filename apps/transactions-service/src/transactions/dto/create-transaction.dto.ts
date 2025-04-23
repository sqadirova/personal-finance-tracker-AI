import { TransactionType } from '../transaction-type.enum';
import { CategoryType } from '../category-type.enum';
import { IsEnum, IsNumber, IsString } from 'class-validator';


export class CreateTransactionDto {
    @IsString()
    userId: string;

    @IsNumber()
    amount: number;

    @IsEnum(CategoryType)
    category: CategoryType;

    @IsEnum(TransactionType)
    type: TransactionType;
}
