import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TransactionsModule } from './transactions/transactions.module';

@Module({
  imports: [
      TransactionsModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
})
export class AppModule {}

