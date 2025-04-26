import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(private readonly prisma: PrismaService) {}

    async create(email: string, password: string): Promise<User> {
        const hashed = await bcrypt.hash(password, 10);
        return this.prisma.user.create({ data: { email, password: hashed } });
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.prisma.user.findUnique({ where: { email } });
    }
}
