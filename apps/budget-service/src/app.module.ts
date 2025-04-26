import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BudgetModule } from './budget/budget.module';

@Module({
  imports: [
    BudgetModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
})
export class AppModule {}


