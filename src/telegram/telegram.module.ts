import { Module } from '@nestjs/common';
import { TelegramService } from './telegram.service';
import { UserModule } from '../users/user.module';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: '.env',
        }),
        UserModule,
    ],
    providers: [TelegramService],
    exports: [TelegramService],
})
export class TelegramModule {}