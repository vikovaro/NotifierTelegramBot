import { Controller, Post, Body } from '@nestjs/common';
import { CoreService } from './core.service';

@Controller()
export class CoreController {
    constructor(private readonly appService: CoreService) {}

    @Post('broadcast')
    async sendBroadcast(@Body('message') message: string) {
        return this.appService.sendBroadcastMessage(message);
    }
}
