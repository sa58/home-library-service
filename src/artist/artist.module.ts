import { Module } from '@nestjs/common';
import { TrackRepository } from 'src/track/track.repository';
import { ArtistController } from './artist.controller';
import { ArtistRepository } from './artist.repository';
import { ArtistService } from './artist.service';

@Module({
    controllers: [ArtistController],
    providers: [ArtistService, ArtistRepository, TrackRepository],
})
export class ArtistModule {

}
