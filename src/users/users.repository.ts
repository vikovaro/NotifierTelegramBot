import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { IUser, User } from '../entities/user.entity';

@Injectable()
export class UserRepository {
    constructor(
        @InjectModel(User)
        private userModel: typeof User,
    ) {}

    async getUser(chatId: number): Promise<IUser | null> {
        const user = await this.userModel.findOne({
            where: { chatId },
            raw: true,
        });
        return user;
    }

    async addUser(chatId: number, username: string): Promise<IUser> {
        const user = await this.userModel.create(
            {
                chatId,
                username,
                lastActivity: new Date(),
            },
            {
                raw: true,
            },
        );
        return user.get({ plain: true });
    }

    async getAllUsers(): Promise<IUser[]> {
        return this.userModel.findAll({
            raw: true,
        });
    }
}
