import {
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { validate } from 'uuid';
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
  async addTrackToFavs(@Param('uuid') uuid: string): Promise<string> {
    if (!validate(uuid)) {
      throw new HttpException('Uuid isn`t valid', HttpStatus.BAD_REQUEST);
    }

    await this.favsService.addTrackToFavs(uuid);
    return `${uuid} added to favourites`;
  }

  @Delete('track/:uuid')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteTrackFromFavs(@Param('uuid') uuid: string): Promise<string> {
    if (!validate(uuid)) {
      throw new HttpException('Uuid isn`t valid', HttpStatus.BAD_REQUEST);
    }
    console.log('dddd');
    await this.favsService.deleteTrackFromFavs(uuid);
    return `${uuid} deleted from favourites`;
  }

  @Post('artist/:uuid')
  @HttpCode(HttpStatus.CREATED)
  async addArtistToFavs(@Param('uuid') uuid: string): Promise<string> {
    if (!validate(uuid)) {
      throw new HttpException('Uuid isn`t valid', HttpStatus.BAD_REQUEST);
    }

    await this.favsService.addArtistToFavs(uuid);
    return `${uuid} added to favourites`;
  }

  @Delete('artist/:uuid')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteArtistFromFavs(@Param('uuid') uuid: string): Promise<string> {
    if (!validate(uuid)) {
      throw new HttpException('Uuid isn`t valid', HttpStatus.BAD_REQUEST);
    }

    await this.favsService.deleteArtistFromFavs(uuid);
    return `${uuid} deleted from favourites`;
  }

  @Post('album/:uuid')
  @HttpCode(HttpStatus.CREATED)
  async addAlbumToFavs(@Param('uuid') uuid: string): Promise<string> {
    if (!validate(uuid)) {
      throw new HttpException('Uuid isn`t valid', HttpStatus.BAD_REQUEST);
    }

    await this.favsService.addAlbumToFavs(uuid);
    return `${uuid} added to favourites`;
  }

  @Delete('album/:uuid')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteAlbumFromFavs(@Param('uuid') uuid: string): Promise<string> {
    if (!validate(uuid)) {
      throw new HttpException('Uuid isn`t valid', HttpStatus.BAD_REQUEST);
    }

    await this.favsService.deleteAlbumFromFavs(uuid);
    return `${uuid} deleted from favourites`;
  }
}
