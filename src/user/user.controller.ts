import { Body, Controller, Get, Post } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserService } from "./user.service";

@Controller('users')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) {}

    @Get()
    async findAll(): Promise<CreateUserDto[]> {
        return this.userService.findAll();
    }

    @Post()
    async createUser(
        @Body() createUserDto: CreateUserDto
    ): Promise<CreateUserDto> {
        return this.userService.createUser(createUserDto);
    }
}