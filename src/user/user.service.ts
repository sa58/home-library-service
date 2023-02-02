import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { validate } from "uuid";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserDto } from "./dto/user.dto";
import { UserRepository } from "./user.repository";

@Injectable()
export class UserService {
    constructor(
        private readonly userRepository: UserRepository
    ) {}

    async findAll(): Promise<UserDto[]> {
        return this.userRepository.findAll();
    }

    async findOne(uuid: string): Promise<UserDto> {
        const user = await this.userRepository.findOne(uuid);

        if(!user) {
            throw new HttpException('NO_CONTENT', HttpStatus.NOT_FOUND);
        }

        return user;
    }

    async createUser(createUserDto: CreateUserDto): Promise<Omit<UserDto, 'password'>> {
        return this.userRepository.createUser(createUserDto);
    }

    async delete(uuid: string): Promise<void> {
        const user = await this.userRepository.delete(uuid);

        if(!validate(uuid)) {
            throw new HttpException('NO_CONTENT', HttpStatus.BAD_REQUEST);
        }

        if(!user) {
            throw new HttpException('NO_CONTENT', HttpStatus.NOT_FOUND);
        }

        this.userRepository.delete(uuid);
    }
}