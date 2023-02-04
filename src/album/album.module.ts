import { Module } from '@nestjs/common';
import { TrackRepository } from 'src/track/track.repository';
import { AlbumController } from './album.controller';
import { AlbumRepository } from './album.repository';
import { AlbumService } from './album.service';

@Module({
    controllers: [AlbumController],
    providers: [AlbumService, AlbumRepository, TrackRepository],
})
export class AlbumModule {

}
