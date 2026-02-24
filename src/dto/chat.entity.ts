import { IChat } from '../entities/chat.entity';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class Chat implements IChat {
    @ApiProperty({ example: 1 })
    @Exclude()
    chatId: bigint;

    @ApiProperty({ example: "username" })
    @Exclude()
    username: string;
}