import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, Post, Put, Response } from "@nestjs/common";
import { validate } from "uuid";
import { FavsEntity } from "./favs.entity";
import { FavsService } from "./favs.service";

@Controller('favs')
export class FavsController {
    constructor(
        private readonly favsService: FavsService
    ) {}

    @Get()
    async findAll(): Promise<FavsEntity> {
        return this.favsService.findAll();
    }
}