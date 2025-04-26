import { TransactionType } from '../transaction-type.enum';
import { CategoryType } from '../category-type.enum';
import { IsUUID, IsEnum, IsNumber, IsString } from 'class-validator';


export class CreateTransactionDto {
    @IsUUID()
    userId: string;

    @IsNumber()
    amount: number;

    @IsEnum(CategoryType)
    category: CategoryType;

    @IsEnum(TransactionType)
    type: TransactionType;
}
