import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { FavsEntity } from "./favs.entity";
import { FavsRepository } from "./favs.repository";

@Injectable()
export class FavsService {
    constructor(
        private readonly favsRepository: FavsRepository
    ) {}

    async findAll(): Promise<FavsEntity> {
        return this.favsRepository.findAll();
    }
}