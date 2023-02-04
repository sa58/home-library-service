import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, Post, Put, Response } from "@nestjs/common";
import { validate } from "uuid";
import { ArtistEntity } from "./artist.entity";
import { ArtistService } from "./artist.service";
import { ArtistDto } from "./dto/artist.dto";

@Controller('artist')
export class ArtistController {
    constructor(
        private readonly artistService: ArtistService
    ) {}

    @Get()
    async findAll(): Promise<ArtistEntity[]> {
        return this.artistService.findAll();
    }

    @Get(':uuid')
    async findOne(
        @Param('uuid') uuid: string
    ): Promise<ArtistEntity> {
        if(!validate(uuid)) {
            throw new HttpException('Uuid isn`t valid', HttpStatus.BAD_REQUEST);
        }
        return (await this.artistService.findOne(uuid)).artist;
    }

    @Post()
    async createArtist(
        @Body() createArtistDto: ArtistDto
    ): Promise<ArtistEntity> {
        return this.artistService.create(createArtistDto);
    }

    @Delete(':uuid')
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(
        @Param('uuid') uuid: string
    ): Promise<void> {
        if(!validate(uuid)) {
            throw new HttpException('Uuid isn`t valid', HttpStatus.BAD_REQUEST);
        }
        return this.artistService.delete(uuid);
    }

    @Put(':uuid')
    async update(
        @Param('uuid') uuid: string,
        @Body() artistDto: ArtistDto
    ): Promise<ArtistEntity> {
        if(!validate(uuid)) {
            throw new HttpException('Uuid isn`t valid', HttpStatus.BAD_REQUEST);
        }

        return this.artistService.update(uuid, artistDto);
    }
}