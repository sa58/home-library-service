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
import { TrackDto } from './dto/track.dto';
import { TrackEntity } from './track.entity';
import { TrackService } from './track.service';

@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  async findAll(): Promise<TrackEntity[]> {
    const tracks = await this.trackService.findAll();
    return tracks.map((track) => new TrackEntity(track));
  }

  @Get(':uuid')
  async findOne(
    @Param('uuid', new ParseUUIDPipe(parseUUIDPipeOptions)) uuid: string,
  ): Promise<TrackEntity> {
    const track = await this.trackService.findOne(uuid);
    return new TrackEntity(track);
  }

  @Post()
  async createTrack(@Body() createTrackDto: TrackDto): Promise<TrackEntity> {
    const createdTrack = await this.trackService.create(createTrackDto);
    return new TrackEntity(createdTrack);
  }

  @Delete(':uuid')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(
    @Param('uuid', new ParseUUIDPipe(parseUUIDPipeOptions)) uuid: string,
  ): Promise<void> {
    return this.trackService.delete(uuid);
  }

  @Put(':uuid')
  async update(
    @Param('uuid', new ParseUUIDPipe(parseUUIDPipeOptions)) uuid: string,
    @Body() trackDto: TrackDto,
  ): Promise<TrackEntity> {
    const updatedTrack = await this.trackService.update(uuid, trackDto);
    return new TrackEntity(updatedTrack);
  }
}
