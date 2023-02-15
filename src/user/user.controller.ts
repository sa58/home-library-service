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
import { Prisma } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll() {
    const users = await this.userService.findAll();
    return users.map((user) => new UserEntity(user))
  }

  // @Get(':uuid')
  // async findOne(
  //   @Param('uuid', new ParseUUIDPipe({ version: '4' })) uuid: string,
  // ): Promise<UserEntity> {
  //   return (await this.userService.findOne(uuid)).user;
  // }

  @Post()
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<Omit<UserEntity, 'password'>> {
    return this.userService.createUser(createUserDto);
  }

  // @Delete(':uuid')
  // @HttpCode(HttpStatus.NO_CONTENT)
  // async delete(
  //   @Param('uuid', new ParseUUIDPipe({ version: '4' })) uuid: string,
  // ): Promise<void> {
  //   return this.userService.delete(uuid);
  // }

  // @Put(':uuid')
  // async update(
  //   @Param('uuid', new ParseUUIDPipe({ version: '4' })) uuid: string,
  //   @Body() updateUserDto: UpdateUserDto,
  // ): Promise<Omit<UserEntity, 'password'>> {
  //   return this.userService.update(uuid, updateUserDto);
  // }
}
