import { Injectable } from '@nestjs/common';
import { IUser } from '../entities/user.entity';
import { PrismaClient } from '@prisma/client/extension';

@Injectable()
export class UserRepository {
    constructor(
        private readonly prisma: PrismaClient,
    ) {}

    async getUser(chatId: number): Promise<IUser> {
        return await this.prisma.user.findUnique({id: chatId});
    }

    async addUser(chatId: number, username: string): Promise<IUser> {
        return await this.prisma.user.add({id: chatId, username: username});
    }

    async getAllUsers(): Promise<IUser[]> {
        return await this.prisma.user.findAll();
    }
}
