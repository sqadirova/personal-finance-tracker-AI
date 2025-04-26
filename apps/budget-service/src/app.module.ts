import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { BudgetModule } from './budget/budget.module';

@Module({
  imports: [
    PrismaModule,
    BudgetModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
})
export class AppModule {}


