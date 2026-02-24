import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client/extension';

@Injectable()
export class UserRepository {
    constructor(
        private readonly prisma: PrismaClient,
    ) {}

    async getUser(userId: number) {
        return await this.prisma.user.findUnique({id: userId});
    }

    async getUserByUsername(username: string) {
        return await this.prisma.user.findUnique({username: username });
    }
}
