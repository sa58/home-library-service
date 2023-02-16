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
    const artists = await this.prisma.favourite_artist.findMany({
      include: {
        artist: true,
      },
    });

    const albums = await this.prisma.favourite_album.findMany({
      include: {
        album: true,
      },
    });

    const tracks = await this.prisma.favourite_track.findMany({
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
    await this.prisma.favourite_track.create({ data: { trackId: uuid } });
  }

  async deleteTrackFromFavs(uuid: string): Promise<void> {
    await this.trackService.findOneForFavsModule(uuid);

    await this.prisma.favourite_track.delete({
      where: {
        trackId: uuid,
      },
    });
  }

  async deleteArtistFromFavs(uuid: string): Promise<void> {
    await this.artistService.findOneForFavsModule(uuid);

    await this.prisma.favourite_artist.delete({
      where: {
        artistId: uuid,
      },
    });
  }

  async addArtistToFavs(uuid: string): Promise<void> {
    await this.artistService.findOneForFavsModule(uuid);

    await this.prisma.favourite_artist.create({ data: { artistId: uuid } });
  }

  async addAlbumToFavs(uuid: string): Promise<void> {
    await this.albumService.findOneForFavsModule(uuid);

    await this.prisma.favourite_album.create({ data: { albumId: uuid } });
  }

  async deleteAlbumFromFavs(uuid: string): Promise<void> {
    await this.albumService.findOneForFavsModule(uuid);

    await this.prisma.favourite_album.delete({
      where: {
        albumId: uuid,
      },
    });
  }
}
