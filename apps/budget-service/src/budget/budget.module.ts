import { Module } from '@nestjs/common';
import { JwtStrategy } from '../auth/jwt.strategy';
import { BudgetService } from './budget.service';
import { BudgetController } from './budget.controller';

@Module({
  providers: [BudgetService, JwtStrategy],
  controllers: [BudgetController]
})
export class BudgetModule {}
