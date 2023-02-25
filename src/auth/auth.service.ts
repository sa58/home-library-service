import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
// import { UserEntity } from './user.entity';
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor() {}

  // async findAll(): Promise<UserEntity[]> {
  //   return this.prisma.user.findMany();
  // }
}
