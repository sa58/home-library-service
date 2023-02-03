import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, Post, Put, Response } from "@nestjs/common";
import { validate } from "uuid";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserEntity } from "./user.entity";
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
    ): Promise<UserEntity> {
        if(!validate(uuid)) {
            throw new HttpException('Uuid isn`t valid', HttpStatus.BAD_REQUEST);
        }
        return this.userService.findOne(uuid);
    }

    @Post()
    async createUser(
        @Body() createUserDto: CreateUserDto
    ): Promise<Omit<UserEntity, 'password'>> {
        return this.userService.createUser(createUserDto);
    }

    @Delete(':uuid')
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(
        @Param('uuid') uuid: string
    ): Promise<void> {
        if(!validate(uuid)) {
            throw new HttpException('Uuid isn`t valid', HttpStatus.BAD_REQUEST);
        }
        return this.userService.delete(uuid);
    }

    @Put(':uuid')
    async update(
        @Param('uuid') uuid: string,
        @Body() updateUserDto: UpdateUserDto
    ): Promise<Omit<UserEntity, 'password'>> {
        if(!validate(uuid)) {
            throw new HttpException('Uuid isn`t valid', HttpStatus.BAD_REQUEST);
        }

        return this.userService.update(uuid, updateUserDto);
    }
}