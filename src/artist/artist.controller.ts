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
import { ArtistEntity } from './artist.entity';
import { ArtistService } from './artist.service';
import { ArtistDto } from './dto/artist.dto';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  async findAll(): Promise<ArtistEntity[]> {
    return this.artistService.findAll();
  }

  @Get(':uuid')
  async findOne(
    @Param('uuid', new ParseUUIDPipe({ version: '4' })) uuid: string,
  ): Promise<ArtistEntity> {
    return (await this.artistService.findOne(uuid)).artist;
  }

  @Post()
  async createArtist(
    @Body() createArtistDto: ArtistDto,
  ): Promise<ArtistEntity> {
    return this.artistService.create(createArtistDto);
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
    @Body() artistDto: ArtistDto,
  ): Promise<ArtistEntity> {
    return this.artistService.update(uuid, artistDto);
  }
}
