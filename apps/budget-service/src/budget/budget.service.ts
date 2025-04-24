import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import axios from 'axios';
import { CreateSummaryDto } from './dto/create-summary.dto';

const prisma = new PrismaClient();

@Injectable()
export class BudgetService {
    async createSuggestion(dto: CreateSummaryDto) {
        const { data } = await axios.post('http://localhost:5000/recommend', dto);

        return prisma.budgetSuggestion.create({
            data: {
                ...dto,
                suggestion: data.suggestion,
            },
        });
    }

    async findAll() {
        return prisma.budgetSuggestion.findMany();
    }
}

