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
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { parseUUIDPipeOptions } from 'src/app.constants';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@UseGuards(AuthGuard)
@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll() {
    const users = await this.userService.findAll();
    return users.map((user) => new UserEntity(user));
  }

  @Get(':uuid')
  async findOne(
    @Param('uuid', new ParseUUIDPipe(parseUUIDPipeOptions)) uuid: string,
  ): Promise<UserEntity> {
    const user = await this.userService.findOne(uuid);
    return new UserEntity(user);
  }

  @Post()
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<Omit<UserEntity, 'password'>> {
    const createdUser = await this.userService.createUser(createUserDto);
    return new UserEntity(createdUser);
  }

  @Delete(':uuid')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(
    @Param('uuid', new ParseUUIDPipe(parseUUIDPipeOptions)) uuid: string,
  ): Promise<void> {
    return this.userService.delete(uuid);
  }

  @Put(':uuid')
  async update(
    @Param('uuid', new ParseUUIDPipe(parseUUIDPipeOptions)) uuid: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<Omit<UserEntity, 'password'>> {
    const updatedUser = await this.userService.update(uuid, updateUserDto);
    return new UserEntity(updatedUser);
  }
}
