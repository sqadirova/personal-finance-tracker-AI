import { Injectable } from '@nestjs/common';
import { PrismaClient, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

@Injectable()
export class UsersService {
    async create(email: string, password: string): Promise<User> {
        const hashed = await bcrypt.hash(password, 10);
        return prisma.user.create({ data: { email, password: hashed } });
    }

    async findByEmail(email: string): Promise<User | null> {
        return prisma.user.findUnique({ where: { email } });
    }
}
