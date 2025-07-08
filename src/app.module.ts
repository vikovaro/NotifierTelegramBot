import { Module } from '@nestjs/common';
import { TelegramModule } from './telegram/telegram.module';
import { UserModule } from './users/user.module';
import { CoreModule } from './core/core.module';
import { User } from './entities/user.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
    imports: [
        SequelizeModule.forRootAsync({
            imports: [ConfigModule],
            inject: [ConfigService],
            useFactory: (configService: ConfigService) => ({
                dialect: 'postgres',
                host: configService.get<string>('DB_HOST'),
                port: configService.get<number>('DB_PORT'),
                username: configService.get<string>('DB_USERNAME'),
                password: configService.get<string>('DB_PASSWORD'),
                database: configService.get<string>('DB_NAME'),
                models: [User],
                autoLoadModels: true,
                synchronize: true,
            }),
        }),
        CoreModule,
        TelegramModule,
        UserModule,
    ],
})
export class AppModule {}
