import { Module } from '@nestjs/common';
import { TelegramModule } from './telegram/telegram.module';
import { UserModule } from './users/user.module';
import { CoreModule } from './core/core.module';
import { ChatModule } from './chats/chat.module';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Module({
    imports: [
        CoreModule,
        TelegramModule,
        ChatModule,
        UserModule,
    ],
    providers: [
        JwtAuthGuard,
    ]
})
export class AppModule {}
