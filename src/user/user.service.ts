import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserRepository } from "./user.repository";

@Injectable()
export class UserService {
    constructor(
        private readonly userRepository: UserRepository
    ) {}

    async findAll(): Promise<CreateUserDto[]> {
        return this.userRepository.findAll();
    }

    async createUser(createUserDto: CreateUserDto): Promise<CreateUserDto> {
        return this.userRepository.createUser(createUserDto);
    }
}