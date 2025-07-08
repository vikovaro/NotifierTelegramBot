import { Injectable, OnModuleInit } from '@nestjs/common';
import { Bot } from 'grammy';
import { UserService } from '../users/user.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TelegramService implements OnModuleInit {
    private bot: Bot;

    constructor(
        private userService: UserService,
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

            await this.userService.addUser(chatId, username);

            await ctx.reply(`Привет, ${username}! Теперь ты подписан на рассылку.`);
        });

        this.bot.start();
        console.log('Telegram bot started');
    }

    async broadcastMessage(message: string): Promise<{total: number}> {
        const users = await this.userService.getAllUsers();
        let total = 0;

        for (const user of users) {

            console.log(`test ${user}`);

            try {
                await this.bot.api.sendMessage(user.chatId, message);
                total++;
            } catch (err) {
                console.error(`Error by sending message to ${user.username}: ${err}`);
            }
        }

        return {
            total: total,
        };
    }
}
