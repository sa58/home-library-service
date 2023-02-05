import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 } from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserAndPosition } from './types/user-and-position.type';
import { UserEntity } from './user.entity';

@Injectable()
export class UserRepository {
  static users: UserEntity[] = [];

  public findAll(): UserEntity[] {
    return UserRepository.users;
  }

  public findOne(uuid: string): UserAndPosition {
    const pos = UserRepository.users.findIndex((user) => user.id === uuid);

    if (pos < 0) {
      return null;
    }

    const [user] = UserRepository.users.slice(pos, pos + 1);
    return { user, pos };
  }

  public createUser(user: CreateUserDto): Omit<UserEntity, 'password'> {
    const now = Date.now();
    const newUser = {
      ...user,
      id: v4(),
      version: 1,
      createdAt: now,
      updatedAt: now,
    };

    UserRepository.users.push(newUser);
    return {
      id: newUser.id,
      version: newUser.version,
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt,
      login: newUser.login,
    };
  }

  public delete(userAndPosition: UserAndPosition): void {
    const pos = userAndPosition.pos;

    UserRepository.users.splice(pos, 1);
  }

  public update(
    updateUserDto: UpdateUserDto,
    userAndPosition: UserAndPosition,
  ): Omit<UserEntity, 'password'> {
    const prevUser = userAndPosition.user;

    if (prevUser.password !== updateUserDto.oldPassword) {
      throw new HttpException('NO_CONTENT', HttpStatus.FORBIDDEN);
    }

    const newUser = {
      ...prevUser,
      version: prevUser.version + 1,
      updatedAt: Date.now(),
      password: updateUserDto.newPassword,
    };

    UserRepository.users[userAndPosition.pos] = newUser;

    return {
      id: prevUser.id,
      version: newUser.version,
      createdAt: prevUser.createdAt,
      updatedAt: newUser.updatedAt,
      login: prevUser.login,
    };
  }
}
