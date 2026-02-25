import { Injectable, OnModuleInit } from '@nestjs/common';
import { Bot } from 'grammy';
import { ConfigService } from '@nestjs/config';
import { ChatService } from '../chats/chat.service';

@Injectable()
export class TelegramService implements OnModuleInit {
    private bot: Bot;
    private readonly MESSAGES_PER_SECOND_LIMIT = 30;
    private readonly TARGET_MESSAGES_PER_SECOND = 20;
    private readonly INSTANT_SEND_THRESHOLD = 20;

    private messageQueue: Array<{ chatId: string; text: string }> = [];
    private queueInterval: NodeJS.Timeout | null = null;

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
        this.startQueueProcessor();

        this.bot.command('start', async (ctx) => {
            const chatId = ctx.chat.id;
            const username = ctx.from!.username || ctx.from!.first_name;

            await this.chatService.addChat(chatId, username);

            await ctx.reply(`Привет, ${username}! Теперь ты подписан на рассылку.`);
        });

        this.bot.start();
        console.log('Telegram bot started');
    }

    /**
     * Public helper to add a single message to the queue.
     * Can be reused from other services to send custom messages.
     */
    public queueMessage(chatId: number | string | bigint, message: string): void {
        this.messageQueue.push({
            chatId: chatId.toString(),
            text: message,
        });
    }

    private startQueueProcessor(): void {
        if (this.queueInterval) {
            return;
        }

        this.queueInterval = setInterval(() => {
            this.processQueue().catch((err) =>
                console.error('Error while processing Telegram message queue:', err),
            );
        }, 1000);
    }

    private async processQueue(): Promise<void> {
        if (!this.bot || this.messageQueue.length === 0) {
            return;
        }

        const batchSize = Math.min(
            this.messageQueue.length,
            this.TARGET_MESSAGES_PER_SECOND,
        );

        const batch = this.messageQueue.splice(0, batchSize);

        await Promise.all(
            batch.map(async (item) => {
                try {
                    await this.bot.api.sendMessage(item.chatId, item.text);
                } catch (err) {
                    console.error(
                        `Error by sending queued message to chat ${item.chatId}: ${err}`,
                    );
                }
            }),
        );
    }

    async broadcastMessage(message: string): Promise<{total: number}> {
        const chats = await this.chatService.getAllChats();
        let total = 0;

        // If the audience is small enough, send immediately.
        if (chats.length <= this.INSTANT_SEND_THRESHOLD) {
            for (const chat of chats) {
                try {
                    await this.bot.api.sendMessage(chat.chatId.toString(), message);
                    total++;
                } catch (err) {
                    console.error(`Error by sending message to ${chat.username}: ${err}`);
                }
            }
        } else {
            // For larger broadcasts, respect the rate limit by queuing messages.
            for (const chat of chats) {
                this.queueMessage(chat.chatId, message);
                total++;
            }
        }

        return {
            total: total,
        };
    }
}
