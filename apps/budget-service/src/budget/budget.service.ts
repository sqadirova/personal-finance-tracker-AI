import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import axios from 'axios';
import { CreateSummaryDto } from './dto/create-summary.dto';

@Injectable()
export class BudgetService {

    constructor(private readonly prisma: PrismaService) {}

    async createSuggestion(dto: CreateSummaryDto) {
        const { data } = await axios.post('http://ai-recommender:5000/recommend', dto);

        return this.prisma.budgetSuggestion.create({
            data: {
                ...dto,
                suggestion: data,
            },
        });
    }

    async findAll() {
        return this.prisma.budgetSuggestion.findMany();
    }
}

