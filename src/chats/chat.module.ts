import { Module } from '@nestjs/common';
import { ChatRepository } from './chat.repository';
import { ChatService } from './chat.service';

@Module({
    imports: [],
    providers: [ChatRepository, ChatService],
    exports: [ChatService],
})
export class ChatModule {}