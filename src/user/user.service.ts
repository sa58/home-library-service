import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { v4 } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService
  ) {}

  async findAll(): Promise<UserEntity[]> {
    return this.prisma.user.findMany();
  }

  async findOne(uuid: string): Promise<UserEntity> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: uuid,
      },
    });

    if (user === null) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  async createUser(
    createUserDto: CreateUserDto,
  ): Promise<Omit<UserEntity, 'password'>> {
      const now = BigInt(Date.now());

      const newUser = {
        ...createUserDto,
        id: v4(),
        version: 1,
        createdAt: now,
        updatedAt: now
      };

      return await this.prisma.user.create({data: newUser});
  }

  async delete(uuid: string): Promise<void> {
    await this.findOne(uuid);
    
    await this.prisma.user.delete({
      where: {
        id: uuid,
      },
    });
  }

  async update(
    uuid: string,
    updateUserDto: UpdateUserDto,
  ): Promise<Omit<UserEntity, 'password'>> {
    const user = await this.findOne(uuid);

    if (user.password !== updateUserDto.oldPassword) {
      throw new HttpException('FORBIDDEN', HttpStatus.FORBIDDEN);
    }

    return await this.prisma.user.update({
      where: {
        id: uuid,
      },
      data: {
        password: updateUserDto.newPassword,
        version: user.version + 1,
        updatedAt: BigInt(Date.now())
      },
    });
  }
}
