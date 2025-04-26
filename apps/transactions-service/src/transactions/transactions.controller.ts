import { Controller, Post, Get, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@UseGuards(JwtAuthGuard)
@Controller('transactions')
export class TransactionsController {
    constructor(private readonly service: TransactionsService) {}

    @Post()
    create(@Body() body: CreateTransactionDto) {
        return this.service.create(body);
    }

    @Get(':userId')
    findAll(@Param('userId') userId: string) {
        return this.service.findAll(userId);
    }

    @Get('current_month/:userId')
    getMonthlyTransactions(@Param('userId') userId: string) {
        return this.service.getCurrentMonthTransactions(userId);
    }


    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.service.remove(id);
    }

    @Get('summary/:userId')
    getSummary(@Param('userId') userId: string) {
        return this.service.getMonthlySummary(userId);
    }

    @Get('current_month/split/:userId')
    getMonthlyTransactionsSplit(@Param('userId') userId: string) {
        return this.service.getCurrentMonthTransactionsSplit(userId);
    }

}
