import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { CoreService } from './core.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller()
export class CoreController {
    constructor(private readonly appService: CoreService) {}

    @UseGuards(JwtAuthGuard)
    @Post('broadcast')
    async sendBroadcast(@Body('message') message: string) {
        return this.appService.sendBroadcastMessage(message);
    }
}
