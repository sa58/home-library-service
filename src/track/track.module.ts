import { Module } from '@nestjs/common';
import { AlbumService } from 'src/album/album.service';
import { ArtistService } from 'src/artist/artist.service';
import { FavsService } from 'src/favs/favs.service';
import { PrismaService } from 'src/prisma.service';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';

@Module({
  controllers: [TrackController],
  providers: [
    TrackService,
    FavsService,
    PrismaService,
    ArtistService,
    AlbumService,
  ],
  exports: [TrackModule],
})
export class TrackModule {}
