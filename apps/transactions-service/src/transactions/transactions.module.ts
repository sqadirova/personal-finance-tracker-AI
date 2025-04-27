import {Module} from '@nestjs/common';
import {
    ConfigModule,
    ConfigService
} from '@nestjs/config';

import {PassportModule} from '@nestjs/passport';
import {JwtModule} from '@nestjs/jwt';

import {TransactionsController} from './transactions.controller';
import {TransactionsService} from './transactions.service';
import {JwtStrategy} from '../auth/jwt.strategy';
import {PrismaModule} from '../prisma/prisma.module';

@Module({
    imports: [
        ConfigModule,
        PrismaModule,
        PassportModule.register({defaultStrategy: 'jwt'}),
        JwtModule.registerAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (cfg: ConfigService) => ({
                secret: cfg.get<string>('JWT_SECRET'),
                signOptions: {expiresIn: '1h'},
            }),
        }),
    ],
    controllers: [TransactionsController],
    providers: [TransactionsService, JwtStrategy],
})
export class TransactionsModule {
}
