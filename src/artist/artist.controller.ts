import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { parseUUIDPipeOptions } from 'src/app.constants';
import { ArtistEntity } from './artist.entity';
import { ArtistService } from './artist.service';
import { ArtistDto } from './dto/artist.dto';

@Controller('artist')
@UseInterceptors(ClassSerializerInterceptor)
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  async findAll(): Promise<ArtistEntity[]> {
    const artists = await this.artistService.findAll();
    return artists.map((artist) => new ArtistEntity(artist));
  }

  @Get(':uuid')
  async findOne(
    @Param('uuid', new ParseUUIDPipe(parseUUIDPipeOptions)) uuid: string,
  ): Promise<ArtistEntity> {
    const artist = await this.artistService.findOne(uuid);
    return new ArtistEntity(artist);
  }

  @Post()
  async createArtist(
    @Body() createArtistDto: ArtistDto,
  ): Promise<ArtistEntity> {
    const createdArtist = await this.artistService.create(createArtistDto);
    return new ArtistEntity(createdArtist);
  }

  @Delete(':uuid')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(
    @Param('uuid', new ParseUUIDPipe(parseUUIDPipeOptions)) uuid: string,
  ): Promise<void> {
    return await this.artistService.delete(uuid);
  }

  @Put(':uuid')
  async update(
    @Param('uuid', new ParseUUIDPipe(parseUUIDPipeOptions)) uuid: string,
    @Body() artistDto: ArtistDto,
  ): Promise<ArtistEntity> {
    const updatedArtist = await this.artistService.update(uuid, artistDto);
    return new ArtistEntity(updatedArtist);
  }
}
