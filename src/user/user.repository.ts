import { Injectable } from "@nestjs/common";
import { v4 } from 'uuid';
import { CreateUserDto } from "./dto/create-user.dto";
import { UserDto } from "./dto/user.dto";

@Injectable()
export class UserRepository {
    static users: UserDto[] = [];

    public findAll(): UserDto[] {
        return UserRepository.users;
    }

    public findOne(uuid: string): UserDto {
        const pos = UserRepository.users.findIndex(user => user.id === uuid);

        if(pos < 0) {
            return null;
        }

        const [user] =  UserRepository.users.slice(pos, pos + 1);
        return user;
    }

    public createUser(user: CreateUserDto): Omit<UserDto, 'password'> {
        const now = Date.now()
        const newUser = {
            ...user,
            id: v4(),
            version: 1,
            createdAt: now,
            updatedAt: now
        };

        UserRepository.users.push(newUser);
        return {
            id: newUser.id,
            version: newUser.version,
            createdAt: newUser.createdAt,
            updatedAt: newUser.updatedAt,
            login: newUser.login
        };
    }

    public delete(uuid: string): UserDto {
        const pos = UserRepository.users.findIndex(user => user.id === uuid);

        if (pos < 0) {
            return null;
        }

        const [user] =  UserRepository.users.slice(pos, pos + 1);
        UserRepository.users.splice(pos, 1);

        return user;
    }
}
