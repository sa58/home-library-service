import { Module } from '@nestjs/common';
import { AlbumService } from 'src/album/album.service';
import { ArtistService } from 'src/artist/artist.service';
import { PrismaService } from 'src/prisma.service';
import { TrackService } from 'src/track/track.service';
import { FavsController } from './favs.controller';
import { FavsService } from './favs.service';

@Module({
  controllers: [FavsController],
  providers: [
    FavsService,
    PrismaService,
    ArtistService,
    AlbumService,
    TrackService,
  ],
  exports: [FavsModule],
})
export class FavsModule {}
