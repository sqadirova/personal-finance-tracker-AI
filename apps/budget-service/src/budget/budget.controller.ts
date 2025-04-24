import { Body, Controller, Get, Post } from '@nestjs/common';
import { BudgetService } from './budget.service';
import { CreateSummaryDto } from './dto/create-summary.dto';

@Controller('budget')
export class BudgetController {
    constructor(private readonly service: BudgetService) {}

    @Post('suggest')
    create(@Body() dto: CreateSummaryDto) {
        return this.service.createSuggestion(dto);
    }

    @Get('suggestions')
    findAll() {
        return this.service.findAll();
    }
}
