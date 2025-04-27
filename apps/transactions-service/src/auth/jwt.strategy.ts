// import { Injectable, UnauthorizedException } from '@nestjs/common';
// import { PassportStrategy } from '@nestjs/passport';
// import { ExtractJwt, Strategy } from 'passport-jwt';
//
// @Injectable()
// export class JwtStrategy extends PassportStrategy(Strategy) {
//     constructor() {
//         super({
//             jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//             ignoreExpiration: false,
//             secretOrKey: process.env.JWT_SECRET || 'default-secret-key',
//         });
//     }
//
//     async validate(payload: any) {
//         console.log('Validating JWT payload:', payload);
//         if (!payload?.sub) {
//             console.log('Invalid token payload!');
//             throw new UnauthorizedException();
//         }
//         return { userId: payload.sub, email: payload.email };
//     }
// }

import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy }             from '@nestjs/passport';
import { ExtractJwt, Strategy }         from 'passport-jwt';
import { ConfigService }                from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(config: ConfigService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: config.get<string>('JWT_SECRET') || 'default-secret-key',
        });
    }

    async validate(payload: any) {
        // this runs on every request that passes the JWT guard
        console.log('→ Validating JWT payload:', payload);

        if (!payload?.sub) {
            console.log('→ JWT payload missing sub, throwing UnauthorizedException');
            throw new UnauthorizedException('Invalid token');
        }

        // whatever you return here becomes `request.user`
        return { userId: payload.sub, email: payload.email };
    }
}

