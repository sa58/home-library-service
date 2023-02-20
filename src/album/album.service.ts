import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { AlbumDto } from './dto/album.dto';
import { AlbumEntity } from './album.entity';
import { PrismaService } from 'src/prisma.service';
import { v4 } from 'uuid';
import { FavsService } from 'src/favs/favs.service';

@Injectable()
export class AlbumService {
  constructor(
    private prisma: PrismaService,
    @Inject(forwardRef(() => FavsService))
    private favsService: FavsService,
  ) {}

  async findAll(): Promise<AlbumEntity[]> {
    return this.prisma.album.findMany();
  }

  async findOne(uuid: string): Promise<AlbumEntity> {
    const album = await this.prisma.album.findUnique({
      where: {
        id: uuid,
      },
    });

    if (album === null) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    return album;
  }

  async findOneForFavsModule(uuid: string): Promise<void> {
    const album = await this.prisma.album.findUnique({
      where: {
        id: uuid,
      },
    });

    if (album === null) {
      throw new HttpException('UNPROCESSABLE', HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async create(createAlbumDto: AlbumDto): Promise<AlbumEntity> {
    const newAlbum = {
      id: v4(),
      ...createAlbumDto,
    };

    return await this.prisma.album.create({ data: newAlbum });
  }

  async delete(uuid: string): Promise<void> {
    await this.findOne(uuid);

    const favs = await this.prisma.favourite.findUnique({
      where: {
        albumId: uuid,
      },
    });

    if (favs) {
      await this.favsService.deleteAlbumFromFavs(uuid);
    }

    await this.prisma.album.delete({
      where: {
        id: uuid,
      },
    });
  }

  async update(uuid: string, albumDto: AlbumDto): Promise<AlbumEntity> {
    const album = await this.findOne(uuid);

    return await this.prisma.album.update({
      where: {
        id: uuid,
      },
      data: {
        ...album,
        ...albumDto,
      },
    });
  }
}
