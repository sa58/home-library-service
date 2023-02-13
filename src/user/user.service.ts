import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserAndPosition } from './types/user-and-position.type';
import { UserEntity } from './user.entity';
// import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    // private readonly userRepository: UserRepository,
    private prisma: PrismaService
  ) {}

  async findAll(): Promise<UserEntity[]> {
    return this.prisma.user.findMany();
  }

  // async findOne(uuid: string): Promise<UserAndPosition> {
  //   const userAndPosition = this.userRepository.findOne(uuid);

  //   if (userAndPosition === null) {
  //     throw new HttpException('NO_CONTENT', HttpStatus.NOT_FOUND);
  //   }

  //   return userAndPosition;
  // }

  // async createUser(
  //   createUserDto: CreateUserDto,
  // ): Promise<Omit<UserEntity, 'password'>> {
  //   return this.userRepository.createUser(createUserDto);
  // }

  // async delete(uuid: string): Promise<void> {
  //   const userAndPosition = await this.findOne(uuid);
  //   this.userRepository.delete(userAndPosition);
  // }

  // async update(
  //   uuid: string,
  //   updateUserDto: UpdateUserDto,
  // ): Promise<Omit<UserEntity, 'password'>> {
  //   const userAndPosition = await this.findOne(uuid);

  //   return this.userRepository.update(updateUserDto, userAndPosition);
  // }
}
