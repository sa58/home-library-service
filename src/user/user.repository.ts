import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class UserRepository {
    static users: CreateUserDto[] = [];

    public findAll(): CreateUserDto[] {
        return UserRepository.users;
    }

    public createUser(user: CreateUserDto): CreateUserDto {
        UserRepository.users.push(user);
        console.log(UserRepository.users)
        return user;
    }
}
