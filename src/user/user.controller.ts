import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, Post, Response } from "@nestjs/common";
import { validate } from "uuid";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserDto } from "./dto/user.dto";
import { UserService } from "./user.service";

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ) {}

    @Get()
    async findAll(): Promise<CreateUserDto[]> {
        return this.userService.findAll();
    }

    @Get(':uuid')
    async findOne(
        @Param('uuid') uuid: string
    ): Promise<UserDto> {
        if(!validate(uuid)) {
            throw new HttpException('NO_CONTENT', HttpStatus.BAD_REQUEST);
        }
        return this.userService.findOne(uuid);
    }

    @Post()
    async createUser(
        @Body() createUserDto: CreateUserDto
    ): Promise<Omit<UserDto, 'password'>> {
        return this.userService.createUser(createUserDto);
    }

    @Delete(':uuid')
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(
        @Param('uuid') uuid: string
    ): Promise<void> {
        this.userService.delete(uuid);
    }

}