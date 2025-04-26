import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { BudgetService } from './budget.service';
import { CreateSummaryDto } from './dto/create-summary.dto';

@Controller('budget')
export class BudgetController {
    constructor(private readonly service: BudgetService) {}

    @UseGuards(JwtAuthGuard)
    @Post('suggest')
    create(@Body() dto: CreateSummaryDto) {
        return this.service.createSuggestion(dto);
    }

    @UseGuards(JwtAuthGuard)
    @Get('suggestions')
    findAll() {
        return this.service.findAll();
    }
}
