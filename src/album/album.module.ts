import { Module } from '@nestjs/common';
import { ArtistService } from 'src/artist/artist.service';
import { FavsService } from 'src/favs/favs.service';
import { PrismaService } from 'src/prisma.service';
import { TrackService } from 'src/track/track.service';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';

@Module({
  controllers: [AlbumController],
  providers: [
    AlbumService,
    ArtistService,
    TrackService,
    FavsService,
    PrismaService,
  ],
  exports: [AlbumModule],
})
export class AlbumModule {}
