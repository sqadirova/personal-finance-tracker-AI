import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { UsersModule }   from '../users/users.module';
import { AuthService }   from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy }    from './jwt.strategy';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject:  [ConfigService],
      useFactory: (cfg: ConfigService) => ({
        secret: cfg.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: cfg.get<string>('TOKEN_EXPIRES') || '1h' },
      }),
    }),
  ],
  controllers: [AuthController],
  providers:   [AuthService, JwtStrategy],
})
export class AuthModule {}

