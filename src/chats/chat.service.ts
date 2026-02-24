import { Injectable } from '@nestjs/common';
import { ChatRepository } from './chat.repository';

@Injectable()
export class ChatService {
    constructor(private readonly chatsRepository: ChatRepository) {}

    async addChat(chatId: number, username: string) {
        let user = await this.chatsRepository.getChat(chatId);

        if (!user) {
            user = await this.chatsRepository.addChats(chatId, username);
        }

        return user;
    }

    async getAllChats() {
        return await this.chatsRepository.getAllChats();
    }
}