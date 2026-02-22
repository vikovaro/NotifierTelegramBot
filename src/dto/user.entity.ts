import { IUser } from '../entities/user.entity';
import { Exclude } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class User implements IUser {
    @ApiProperty({ example: 1 })
    @Exclude()
    chatId: bigint;

    @ApiProperty({ example: "username" })
    @Exclude()
    username: string;
}