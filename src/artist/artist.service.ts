import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ArtistDto } from './dto/artist.dto';
import { ArtistEntity } from './artist.entity';
import { PrismaService } from 'src/prisma.service';
import { v4 } from 'uuid';
import { FavsService } from 'src/favs/favs.service';

@Injectable()
export class ArtistService {
  constructor(
    private prisma: PrismaService,
    private favsService: FavsService,
  ) {}

  async findAll(): Promise<ArtistEntity[]> {
    return this.prisma.artist.findMany();
  }

  async findOne(uuid: string): Promise<ArtistEntity> {
    const artist = await this.prisma.artist.findUnique({
      where: {
        id: uuid,
      },
    });

    if (artist === null) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    return artist;
  }

  async findOneForFavsModule(uuid: string): Promise<void> {
    const artist = await this.prisma.artist.findUnique({
      where: {
        id: uuid,
      },
    });

    if (artist === null) {
      throw new HttpException('UNPROCESSABLE', HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  async create(createArtistDto: ArtistDto): Promise<ArtistEntity> {
    const newArtist = {
      id: v4(),
      ...createArtistDto,
    };

    return await this.prisma.artist.create({ data: newArtist });
  }

  async delete(uuid: string): Promise<void> {
    await this.findOne(uuid);

    const favs = await this.prisma.favourite.findUnique({
      where: {
        artistId: uuid,
      },
    });

    if (favs) {
      await this.favsService.deleteArtistFromFavs(uuid);
    }

    await this.prisma.artist.delete({
      where: {
        id: uuid,
      },
    });
  }

  async update(uuid: string, artistDto: ArtistDto): Promise<ArtistEntity> {
    const artist = await this.findOne(uuid);

    return await this.prisma.artist.update({
      where: {
        id: uuid,
      },
      data: {
        ...artist,
        ...artistDto,
      },
    });
  }
}
