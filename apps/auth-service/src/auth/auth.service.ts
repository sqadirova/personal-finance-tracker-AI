import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {

    constructor(
        private jwt: JwtService,
        private users: UsersService,
    ) {}

    async validateUser(email: string, pass: string) {
        const user = await this.users.findByEmail(email);
        if (user && await bcrypt.compare(pass, user.password)) {
            return user;
        }
        return null;
    }


    async register(email: string, password: string) {
        return this.users.create(email, password);
    }

    async login(email: string, password: string) {
        const user = await this.validateUser(email, password);
        if (!user) throw new UnauthorizedException('Bad credentials');

        const payload = { sub: user.id, email: user.email };
        const token   = await this.jwt.signAsync(payload);

        return { access_token: token };
    }

    // async login(email: string, password: string) {
    //     const user = await this.users.findByEmail(email);
    //     if (!user || !(await bcrypt.compare(password, user.password))) {
    //         throw new UnauthorizedException('Invalid credentials');
    //     }
    //     const token = this.jwt.sign({ sub: user.id, email: user.email });
    //     return { access_token: token };
    // }
}