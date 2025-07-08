import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserService } from './user.service';
import { UserRepository } from './users.repository';
import { User } from '../entities/user.entity';

@Module({
    imports: [SequelizeModule.forFeature([User])],
    providers: [UserRepository, UserService],
    exports: [UserService],
})
export class UserModule {}