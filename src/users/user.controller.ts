import {
    Body,
    Controller,
    HttpStatus,
    Post,
    SerializeOptions,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from './user.service';
import { SignInRequest } from '../dto/sign-in.request';

@Controller('user')
@ApiTags('user')
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    @Post('/login')
    @ApiResponse({ status: HttpStatus.OK, description: 'login', type: String })
    @SerializeOptions({
        strategy: 'exposeAll',
        type: String,
        excludeExtraneousValues: true,
        enableImplicitConversion: true,
    })
    async signIn(@Body() signInDto: SignInRequest) {
        return await this.userService.signIn(signInDto.username, signInDto.password);
    }
}

