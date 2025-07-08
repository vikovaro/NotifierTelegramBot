import { Module } from '@nestjs/common';
import { TelegramModule } from '../telegram/telegram.module';
import { CoreController } from './core.controller';
import { CoreService } from './core.service';

@Module({
    imports: [TelegramModule],
    controllers: [CoreController],
    providers: [CoreService],
})
export class CoreModule {}
