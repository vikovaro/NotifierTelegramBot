import { Injectable } from '@nestjs/common';
import { IChat } from '../entities/chat.entity';
import { PrismaClient } from '@prisma/client/extension';

@Injectable()
export class ChatRepository {
    constructor(
        private readonly prisma: PrismaClient,
    ) {}

    async getChat(chatId: number): Promise<IChat> {
        return await this.prisma.chat.findUnique({id: chatId});
    }

    async addChats(chatId: number, username?: string): Promise<IChat> {
        return await this.prisma.chat.add({id: chatId, username: username});
    }

    async getAllChats(): Promise<IChat[]> {
        return await this.prisma.user.findAll();
    }
}
