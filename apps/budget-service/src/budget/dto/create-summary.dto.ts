import { IsString, IsNumber } from 'class-validator';

export class CreateSummaryDto {
    @IsString()
    userId: string;

    @IsString()
    month: string;

    @IsNumber()
    income: number;

    @IsNumber()
    expense: number;
}

