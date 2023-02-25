import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt'
import { TokenPairEntity } from './token-pair.entity';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { compare } from 'bcrypt';
import { RefreshTokenDto } from './dto/refresh-token.dto';

interface JwtPayload {
  userId: string,
  login: string
}

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService
  ) {}

  async logIn(createUserDto: CreateUserDto): Promise<TokenPairEntity> {
    const user = await this.prisma.user.findMany({
      where: {
        login: createUserDto.login
      }
    });

    if (user.length) {
      const [userData] = user;

      const isUserValid = await compare(createUserDto.password, user[0].password);

      if (isUserValid) {
        const payload = { login: userData.login, userId: userData.id };
        return this.generateTokens(payload);
      } else {
        throw new ForbiddenException('ForbiddenException');
      }
    } else {
      throw new ForbiddenException('ForbiddenException');
    }
  }

  async refreshToken(refreshTokenDto: RefreshTokenDto) {
    const payloadDecoded = this.jwtService.decode(refreshTokenDto.refreshToken) as JwtPayload;
    const { userId } = payloadDecoded;

    const user = await this.prisma.user.findUnique({
      where: {
        id: userId
      }
    });

    if (user) {
      const payload = { login: user.login, userId: user.id };
      return this.generateTokens(payload);
    } else {
      throw new ForbiddenException('ForbiddenException');
    }
  }

  private generateTokens(payload: JwtPayload): TokenPairEntity {
    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET_REFRESH_KEY,
      expiresIn: process.env.TOKEN_REFRESH_EXPIRE_TIME
    });

    return {
      accessToken,
      refreshToken
    }
  }
}
