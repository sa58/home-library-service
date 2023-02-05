import { Module } from '@nestjs/common';
import { AlbumRepository } from 'src/album/album.repository';
import { ArtistRepository } from 'src/artist/artist.repository';
import { TrackRepository } from 'src/track/track.repository';
import { FavsController } from './favs.controller';
import { FavsRepository } from './favs.repository';
import { FavsService } from './favs.service';

@Module({
  controllers: [FavsController],
  providers: [
    FavsService,
    FavsRepository,
    TrackRepository,
    ArtistRepository,
    AlbumRepository,
  ],
  exports: [FavsRepository],
})
export class FavsModule {}
