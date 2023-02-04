import { Body, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, Post, Put, Response } from "@nestjs/common";
import { validate } from "uuid";
import { AlbumEntity } from "./album.entity";
import { AlbumService } from "./album.service";
import { AlbumDto } from "./dto/album.dto";

@Controller('album')
export class AlbumController {
    constructor(
        private readonly artistService: AlbumService
    ) {}

    @Get()
    async findAll(): Promise<AlbumEntity[]> {
        return this.artistService.findAll();
    }

    @Get(':uuid')
    async findOne(
        @Param('uuid') uuid: string
    ): Promise<AlbumEntity> {
        if(!validate(uuid)) {
            throw new HttpException('Uuid isn`t valid', HttpStatus.BAD_REQUEST);
        }
        return (await this.artistService.findOne(uuid)).album;
    }

    @Post()
    async createAlbum(
        @Body() createAlbumDto: AlbumDto
    ): Promise<AlbumEntity> {
        return this.artistService.create(createAlbumDto);
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
        @Body() artistDto: AlbumDto
    ): Promise<AlbumEntity> {
        if(!validate(uuid)) {
            throw new HttpException('Uuid isn`t valid', HttpStatus.BAD_REQUEST);
        }

        return this.artistService.update(uuid, artistDto);
    }
}