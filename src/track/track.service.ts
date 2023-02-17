import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { FavsService } from 'src/favs/favs.service';
import { PrismaService } from 'src/prisma.service';
import { v4 } from 'uuid';
import { TrackDto } from './dto/track.dto';
import { TrackEntity } from './track.entity';

@Injectable()
export class TrackService {
  constructor(
    private prisma: PrismaService,
    @Inject(forwardRef(() => FavsService))
    private favsService: FavsService,
  ) {}

  async findAll(): Promise<TrackEntity[]> {
    return this.prisma.track.findMany();
  }

  async findOne(uuid: string): Promise<TrackEntity> {
    const track = await this.prisma.track.findUnique({
      where: {
        id: uuid,
      },
    });

    if (track === null) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    return track;
  }

  async findOneForFavsModule(uuid: string): Promise<void> {
    const track = await this.prisma.track.findUnique({
      where: {
        id: uuid,
      },
    });

    if (track === null) {
      throw new HttpException('UNPROCESSABLE', HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async create(createTrackDto: TrackDto): Promise<TrackEntity> {
    const newTrack = {
      id: v4(),
      ...createTrackDto,
    };

    return await this.prisma.track.create({ data: newTrack });
  }

  async delete(uuid: string): Promise<void> {
    await this.findOne(uuid);

    const favs = await this.prisma.favourite.findUnique({
      where: {
        trackId: uuid,
      },
    });

    if (favs) {
      await this.favsService.deleteTrackFromFavs(uuid);
    }

    await this.prisma.track.delete({
      where: {
        id: uuid,
      },
    });
  }

  async update(uuid: string, trackDto: TrackDto): Promise<TrackEntity> {
    const track = await this.findOne(uuid);

    return await this.prisma.track.update({
      where: {
        id: uuid,
      },
      data: {
        ...track,
        ...trackDto,
      },
    });
  }
}
