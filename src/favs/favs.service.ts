import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { AlbumService } from 'src/album/album.service';
import { ArtistService } from 'src/artist/artist.service';
import { PrismaService } from 'src/prisma.service';
import { TrackService } from 'src/track/track.service';
import { FavsEntity } from './favs.entity';

@Injectable()
export class FavsService {
  constructor(
    private prisma: PrismaService,
    @Inject(forwardRef(() => ArtistService))
    private artistService: ArtistService,
    @Inject(forwardRef(() => AlbumService))
    private albumService: AlbumService,
    @Inject(forwardRef(() => TrackService))
    private trackService: TrackService,
  ) {}

  async findAll(): Promise<FavsEntity> {
    const artists = await this.prisma.favourite.findMany({
      where: {
        NOT: {
          artistId: null,
        },
      },
      include: {
        artist: true,
      },
    });

    const albums = await this.prisma.favourite.findMany({
      where: {
        NOT: {
          albumId: null,
        },
      },
      include: {
        album: true,
      },
    });

    const tracks = await this.prisma.favourite.findMany({
      where: {
        NOT: {
          trackId: null,
        },
      },
      include: {
        track: true,
      },
    });

    const response = {
      artists: artists.map((el) => el.artist),
      albums: albums.map((el) => el.album),
      tracks: tracks.map((el) => el.track),
    };

    return response;
  }

  async addTrackToFavs(uuid: string): Promise<void> {
    await this.trackService.findOneForFavsModule(uuid);
    await this.prisma.favourite.create({ data: { trackId: uuid } });
  }

  async deleteTrackFromFavs(uuid: string): Promise<void> {
    await this.trackService.findOneForFavsModule(uuid);

    await this.prisma.favourite.delete({
      where: {
        trackId: uuid,
      },
    });
  }

  async deleteArtistFromFavs(uuid: string): Promise<void> {
    await this.artistService.findOneForFavsModule(uuid);

    await this.prisma.favourite.delete({
      where: {
        artistId: uuid,
      },
    });
  }

  async addArtistToFavs(uuid: string): Promise<void> {
    await this.artistService.findOneForFavsModule(uuid);

    await this.prisma.favourite.create({ data: { artistId: uuid } });
  }

  async addAlbumToFavs(uuid: string): Promise<void> {
    await this.albumService.findOneForFavsModule(uuid);

    await this.prisma.favourite.create({ data: { albumId: uuid } });
  }

  async deleteAlbumFromFavs(uuid: string): Promise<void> {
    await this.albumService.findOneForFavsModule(uuid);

    await this.prisma.favourite.delete({
      where: {
        albumId: uuid,
      },
    });
  }
}
