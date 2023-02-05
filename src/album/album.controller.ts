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
import { AlbumEntity } from './album.entity';
import { AlbumService } from './album.service';
import { AlbumDto } from './dto/album.dto';

@Controller('album')
export class AlbumController {
  constructor(private readonly artistService: AlbumService) {}

  @Get()
  async findAll(): Promise<AlbumEntity[]> {
    return this.artistService.findAll();
  }

  @Get(':uuid')
  async findOne(
    @Param('uuid', new ParseUUIDPipe({ version: '4' })) uuid: string,
  ): Promise<AlbumEntity> {
    return (await this.artistService.findOne(uuid)).album;
  }

  @Post()
  async createAlbum(@Body() createAlbumDto: AlbumDto): Promise<AlbumEntity> {
    return await this.artistService.create(createAlbumDto);
  }

  @Delete(':uuid')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(
    @Param('uuid', new ParseUUIDPipe({ version: '4' })) uuid: string,
  ): Promise<void> {
    return this.artistService.delete(uuid);
  }

  @Put(':uuid')
  async update(
    @Param('uuid', new ParseUUIDPipe({ version: '4' })) uuid: string,
    @Body() artistDto: AlbumDto,
  ): Promise<AlbumEntity> {
    return this.artistService.update(uuid, artistDto);
  }
}
