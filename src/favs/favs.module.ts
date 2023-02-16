import { Module } from '@nestjs/common';
import { AlbumService } from 'src/album/album.service';
import { ArtistModule } from 'src/artist/artist.module';
import { ArtistService } from 'src/artist/artist.service';
import { PrismaService } from 'src/prisma.service';
import { TrackService } from 'src/track/track.service';
import { FavsController } from './favs.controller';
import { FavsRepository } from './favs.repository';
import { FavsService } from './favs.service';

@Module({
  controllers: [FavsController],
  providers: [
    FavsService,
    FavsRepository,
    PrismaService,
    ArtistService,
    AlbumService,
    TrackService,
  ],
  // imports: [ArtistModule],
  exports: [FavsModule],
})
export class FavsModule {}
