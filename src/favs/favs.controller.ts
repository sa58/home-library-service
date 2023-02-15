import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
} from '@nestjs/common';
import { parseUUIDPipeOptions } from 'src/app.constants';
import { FavsEntity } from './favs.entity';
import { FavsService } from './favs.service';

@Controller('favs')
export class FavsController {
  constructor(private readonly favsService: FavsService) {}

  @Get()
  async findAll(): Promise<FavsEntity> {
    return await this.favsService.findAll();
  }

  @Post('track/:uuid')
  @HttpCode(HttpStatus.CREATED)
  async addTrackToFavs(
    @Param('uuid', new ParseUUIDPipe(parseUUIDPipeOptions)) uuid: string,
  ): Promise<string> {
    await this.favsService.addTrackToFavs(uuid);
    return `${uuid} added to favourites`;
  }

  @Delete('track/:uuid')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteTrackFromFavs(
    @Param('uuid', new ParseUUIDPipe(parseUUIDPipeOptions)) uuid: string,
  ): Promise<string> {
    await this.favsService.deleteTrackFromFavs(uuid);
    return `${uuid} deleted from favourites`;
  }

  @Post('artist/:uuid')
  @HttpCode(HttpStatus.CREATED)
  async addArtistToFavs(
    @Param('uuid', new ParseUUIDPipe(parseUUIDPipeOptions)) uuid: string,
  ): Promise<string> {
    await this.favsService.addArtistToFavs(uuid);
    return `${uuid} added to favourites`;
  }

  @Delete('artist/:uuid')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteArtistFromFavs(
    @Param('uuid', new ParseUUIDPipe(parseUUIDPipeOptions)) uuid: string,
  ): Promise<string> {
    await this.favsService.deleteArtistFromFavs(uuid);
    return `${uuid} deleted from favourites`;
  }

  @Post('album/:uuid')
  @HttpCode(HttpStatus.CREATED)
  async addAlbumToFavs(
    @Param('uuid', new ParseUUIDPipe(parseUUIDPipeOptions)) uuid: string,
  ): Promise<string> {
    await this.favsService.addAlbumToFavs(uuid);
    return `${uuid} added to favourites`;
  }

  @Delete('album/:uuid')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteAlbumFromFavs(
    @Param('uuid', new ParseUUIDPipe(parseUUIDPipeOptions)) uuid: string,
  ): Promise<string> {
    await this.favsService.deleteAlbumFromFavs(uuid);
    return `${uuid} deleted from favourites`;
  }
}
