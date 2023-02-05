import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { validate } from 'uuid';
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
  async findOne(@Param('uuid') uuid: string): Promise<TrackEntity> {
    if (!validate(uuid)) {
      throw new HttpException('Uuid isn`t valid', HttpStatus.BAD_REQUEST);
    }
    return (await this.trackService.findOne(uuid)).track;
  }

  @Post()
  async createTrack(@Body() createTrackDto: TrackDto): Promise<TrackEntity> {
    return this.trackService.create(createTrackDto);
  }

  @Delete(':uuid')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('uuid') uuid: string): Promise<void> {
    if (!validate(uuid)) {
      throw new HttpException('Uuid isn`t valid', HttpStatus.BAD_REQUEST);
    }
    return this.trackService.delete(uuid);
  }

  @Put(':uuid')
  async update(
    @Param('uuid') uuid: string,
    @Body() trackDto: TrackDto,
  ): Promise<TrackEntity> {
    if (!validate(uuid)) {
      throw new HttpException('Uuid isn`t valid', HttpStatus.BAD_REQUEST);
    }

    return this.trackService.update(uuid, trackDto);
  }
}
