import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { validate } from "uuid";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserEntity } from "./user.entity";
import { UserRepository } from "./user.repository";

@Injectable()
export class UserService {
    constructor(
        private readonly userRepository: UserRepository
    ) {}

    async findAll(): Promise<UserEntity[]> {
        return this.userRepository.findAll();
    }

    async findOne(uuid: string): Promise<UserEntity> {
        const user = await this.userRepository.findOne(uuid);

        if(!user) {
            throw new HttpException('NO_CONTENT', HttpStatus.NOT_FOUND);
        }

        return user;
    }

    async createUser(createUserDto: CreateUserDto): Promise<Omit<UserEntity, 'password'>> {
        return this.userRepository.createUser(createUserDto);
    }

    async delete(uuid: string): Promise<void> {
        const user = this.userRepository.findOne(uuid);

        if(!user) {
            throw new HttpException('NO_CONTENT', HttpStatus.NOT_FOUND);
        }

        this.userRepository.delete(uuid);
    }

    async update(uuid: string, updateUserDto: UpdateUserDto): Promise<Omit<UserEntity, 'password'>> {
        const user = this.userRepository.findOne(uuid);

        if(!user) {
            throw new HttpException('NO_CONTENT', HttpStatus.NOT_FOUND);
        }

        return this.userRepository.update(uuid, updateUserDto);
    }
}