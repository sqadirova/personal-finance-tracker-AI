import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {}

    @Post('register')
    register(@Body() body: { email: string; password: string }) {
        return this.authService.register(body.email, body.password);
    }

    @Post('login')
    login(@Body() body: { email: string; password: string }) {
        console.log('/auth/login called with', body.email);
        return this.authService.login(body.email, body.password);
    }
}
