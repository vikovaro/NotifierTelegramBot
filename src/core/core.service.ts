import { Injectable } from '@nestjs/common';
import { TelegramService } from '../telegram/telegram.service';

@Injectable()
export class CoreService {
    constructor(private readonly telegramService: TelegramService) {}

    async sendBroadcastMessage(message: string) {
        if (!message || message.trim().length === 0) {
            throw new Error('Message cannot be empty');
        }

        const result = await this.telegramService.broadcastMessage(message);

        return {
            status: 'success',
            message: 'Broadcast completed',
            totalUsers: result.total,
        };
    }
}