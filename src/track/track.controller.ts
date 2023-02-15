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
    return this.trackService.findAll();
  }

  @Get(':uuid')
  async findOne(
    @Param('uuid', new ParseUUIDPipe(parseUUIDPipeOptions)) uuid: string,
  ): Promise<TrackEntity> {
    return (await this.trackService.findOne(uuid)).track;
  }

  @Post()
  async createTrack(@Body() createTrackDto: TrackDto): Promise<TrackEntity> {
    return this.trackService.create(createTrackDto);
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
    return this.trackService.update(uuid, trackDto);
  }
}
