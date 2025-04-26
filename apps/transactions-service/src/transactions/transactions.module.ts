import { Module } from '@nestjs/common';
import { JwtStrategy } from '../auth/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';

@Module({
  imports: [
    JwtModule.register({}),
  ],
  providers: [TransactionsService, JwtStrategy],
  controllers: [TransactionsController]
})
export class TransactionsModule {}
