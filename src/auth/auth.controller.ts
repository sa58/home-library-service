import {
    Body,
    ClassSerializerInterceptor,
    Controller,
    Delete,
    Get,
    HttpCode,
    HttpStatus,
    Param,
    ParseUUIDPipe,
    Post,
    Put,
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
        // private readonly authService: AuthService,
        private readonly userService: UserService
    ) {}

    @Get('/signup')
    async signUp(@Body() createUserDto: CreateUserDto) {
        const createdUser =  await this.userService.signUpUser(createUserDto);
        return new UserEntity(createdUser);
    }
}
