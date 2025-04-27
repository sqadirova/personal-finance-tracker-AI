import { Injectable }           from '@nestjs/common';
import { PassportStrategy }     from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService }        from '@nestjs/config';

export interface JwtPayload {
    sub: string;   // user-id
    email: string;
    iat?: number;
    exp?: number;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(cfg: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey:    cfg.get<string>('JWT_SECRET'),
            ignoreExpiration: false,
        });
    }

    async validate(payload: JwtPayload) {
        console.log('Auth-service → JWT validated:', payload);

        return {
            userId: payload.sub,
            email:  payload.email,
        };
    }
}
