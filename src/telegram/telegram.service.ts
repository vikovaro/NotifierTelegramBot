import { Injectable, OnModuleInit } from '@nestjs/common';
import { Bot } from 'grammy';
import { ConfigService } from '@nestjs/config';
import { ChatService } from '../chats/chat.service';

@Injectable()
export class TelegramService implements OnModuleInit {
    private bot: Bot;

    constructor(
        private chatService: ChatService,
        private configService: ConfigService,
    ) {}

    async onModuleInit() {
        const token = this.configService.get<string>('TELEGRAM_BOT_TOKEN');
        if (!token) {
            throw new Error('telegram bot token is missing');
        }

        this.bot = new Bot(token);

        this.bot.command('start', async (ctx) => {
            const chatId = ctx.chat.id;
            const username = ctx.from!.username || ctx.from!.first_name;

            await this.chatService.addChat(chatId, username);

            await ctx.reply(`Привет, ${username}! Теперь ты подписан на рассылку.`);
        });

        this.bot.start();
        console.log('Telegram bot started');
    }

    async broadcastMessage(message: string): Promise<{total: number}> {
        const chats = await this.chatService.getAllChats();
        let total = 0;

        for (const chat of chats) {

            console.log(`test ${chat}`);

            try {
                await this.bot.api.sendMessage(chat.chatId.toString(), message);
                total++;
            } catch (err) {
                console.error(`Error by sending message to ${chat.username}: ${err}`);
            }
        }

        return {
            total: total,
        };
    }
}
