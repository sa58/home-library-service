import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Post,
    UseInterceptors,
} from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserEntity } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';

@Controller('auth')
@UseInterceptors(ClassSerializerInterceptor)
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService
    ) {}

    @Post('/signup')
    async signUp(@Body() createUserDto: CreateUserDto) {
        const createdUser =  await this.userService.signUpUser(createUserDto);
        return new UserEntity(createdUser);
    }

    @Post('/login')
    async logIn(@Body() createUserDto: CreateUserDto) {
        return await this.authService.logIn(createUserDto);
    }
}
