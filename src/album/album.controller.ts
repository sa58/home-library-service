import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
} from '@nestjs/common';
import { parseUUIDPipeOptions } from 'src/app.constants';
import { AlbumEntity } from './album.entity';
import { AlbumService } from './album.service';
import { AlbumDto } from './dto/album.dto';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  async findAll(): Promise<AlbumEntity[]> {
    const albums = await this.albumService.findAll();
    return albums.map((album) => new AlbumEntity(album));
  }

  @Get(':uuid')
  async findOne(
    @Param('uuid', new ParseUUIDPipe(parseUUIDPipeOptions)) uuid: string,
  ): Promise<AlbumEntity> {
    const album = await this.albumService.findOne(uuid);
    return new AlbumEntity(album);
  }

  @Post()
  async createAlbum(@Body() createAlbumDto: AlbumDto): Promise<AlbumEntity> {
    const createdAlbum = await this.albumService.create(createAlbumDto);
    return new AlbumEntity(createdAlbum);
  }

  @Delete(':uuid')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(
    @Param('uuid', new ParseUUIDPipe(parseUUIDPipeOptions)) uuid: string,
  ): Promise<void> {
    return this.albumService.delete(uuid);
  }

  @Put(':uuid')
  async update(
    @Param('uuid', new ParseUUIDPipe(parseUUIDPipeOptions)) uuid: string,
    @Body() artistDto: AlbumDto,
  ): Promise<AlbumEntity> {
    const updatedAlbum = await this.albumService.update(uuid, artistDto);
    return new AlbumEntity(updatedAlbum);
  }
}
