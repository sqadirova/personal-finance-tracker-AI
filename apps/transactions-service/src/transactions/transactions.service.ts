import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // << IMPORT
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { TransactionType } from './transaction-type.enum';
import Decimal from 'decimal.js';


@Injectable()
export class TransactionsService {
    constructor(private readonly prisma: PrismaService) {}

    create(data: CreateTransactionDto) {

        return this.prisma.transaction.create({ data });
    }

    findAll(userId: string) {
        return this.prisma.transaction.findMany({ where: { userId } });
    }

    async getCurrentMonthTransactions(userId: string) {
        const now = new Date();
        const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);

        return this.prisma.transaction.findMany({
            where: {
                userId,
                createdAt: { gte: firstDay },
            },
            orderBy: { createdAt: 'desc' },
        });
    }


    remove(id: string) {
        return this.prisma.transaction.delete({ where: { id } });
    }

    async getMonthlySummary(userId: string) {
        const now = new Date();
        const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);

        const income = await this.prisma.transaction.aggregate({
            _sum: { amount: true },
            where: {
                userId,
                type: TransactionType.INCOME,
                createdAt: { gte: firstDay },
            },
        });

        const expense = await this.prisma.transaction.aggregate({
            _sum: { amount: true },
            where: {
                userId,
                type: TransactionType.EXPENSE,
                createdAt: { gte: firstDay },
            },
        });

        const expensesByCategory = await this.prisma.transaction.groupBy({
            by: ['category'],
            where: {
                userId,
                type: TransactionType.EXPENSE,
                createdAt: { gte: firstDay },
            },
            _sum: {
                amount: true,
            },
        });

        const incomeTotalDecimal = new Decimal(income._sum.amount || 0);
        const expenseTotalDecimal = new Decimal(expense._sum.amount || 0);
        const netBalance = incomeTotalDecimal.minus(expenseTotalDecimal);

        return {
            income: incomeTotalDecimal,
            expense: expenseTotalDecimal,
            netBalance: netBalance.toFixed(2),
            expensesByCategory: expensesByCategory.map((e) => ({
                category: e.category,
                total: new Decimal(e._sum.amount || 0).toFixed(2),
            })),
        };
    }

    async getCurrentMonthTransactionsSplit(userId: string) {
        const now = new Date();
        const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);

        const income = await this.prisma.transaction.findMany({
            where: {
                userId,
                type: 'income',
                createdAt: { gte: firstDay },
            },
            orderBy: { createdAt: 'desc' },
        });

        const expense = await this.prisma.transaction.findMany({
            where: {
                userId,
                type: 'expense',
                createdAt: { gte: firstDay },
            },
            orderBy: { createdAt: 'desc' },
        });

        return {
            income,
            expense,
        };
    }



}
