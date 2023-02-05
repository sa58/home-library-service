import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<CreateUserDto[]> {
    return this.userService.findAll();
  }

  @Get(':uuid')
  async findOne(
    @Param('uuid', new ParseUUIDPipe({ version: '4' })) uuid: string,
  ): Promise<UserEntity> {
    return (await this.userService.findOne(uuid)).user;
  }

  @Post()
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<Omit<UserEntity, 'password'>> {
    return this.userService.createUser(createUserDto);
  }

  @Delete(':uuid')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(
    @Param('uuid', new ParseUUIDPipe({ version: '4' })) uuid: string,
  ): Promise<void> {
    return this.userService.delete(uuid);
  }

  @Put(':uuid')
  async update(
    @Param('uuid', new ParseUUIDPipe({ version: '4' })) uuid: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<Omit<UserEntity, 'password'>> {
    return this.userService.update(uuid, updateUserDto);
  }
}
