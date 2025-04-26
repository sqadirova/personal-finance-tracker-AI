import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module'; // << ADD THIS
import { TransactionsModule } from './transactions/transactions.module';

@Module({
  imports: [
      PrismaModule,
      TransactionsModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
})
export class AppModule {}

