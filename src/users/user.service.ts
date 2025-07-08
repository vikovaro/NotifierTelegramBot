import { Injectable } from '@nestjs/common';
import { UserRepository } from './users.repository';

@Injectable()
export class UserService {
    constructor(private readonly userRepository: UserRepository) {}

    async addUser(chatId: number, username: string) {
        let user = await this.userRepository.getUser(chatId);

        if (!user) {
            user = await this.userRepository.addUser(chatId, username);
        }

        return user;
    }

    async getAllUsers() {
        return await this.userRepository.getAllUsers();
    }
}