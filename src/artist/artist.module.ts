import { Module } from '@nestjs/common';
import { AlbumService } from 'src/album/album.service';
import { FavsService } from 'src/favs/favs.service';
import { PrismaService } from 'src/prisma.service';
import { TrackService } from 'src/track/track.service';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';

@Module({
  controllers: [ArtistController],
  providers: [
    ArtistService,
    AlbumService,
    TrackService,
    PrismaService,
    FavsService,
  ],
  imports: [],
  exports: [ArtistModule],
})
export class ArtistModule {}
