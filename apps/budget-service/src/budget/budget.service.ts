import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
import axios from 'axios';
import { CreateSummaryDto } from './dto/create-summary.dto';

@Injectable()
export class BudgetService {
    private readonly aiUrl: string;

    constructor(private readonly prisma: PrismaService,
                config: ConfigService,
                ) {
        //read AI_URL from .env, fallback to localhost for local dev
        this.aiUrl = config.get<string>('AI_URL') ?? 'http://localhost:5000/recommend';
    }

    async createSuggestion(dto: CreateSummaryDto) {
        const { data } = await axios.post(this.aiUrl, dto);

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

