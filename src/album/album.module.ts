import { Module } from '@nestjs/common';
import { FavsRepository } from 'src/favs/favs.repository';
import { TrackRepository } from 'src/track/track.repository';
import { AlbumController } from './album.controller';
import { AlbumRepository } from './album.repository';
import { AlbumService } from './album.service';

@Module({
    controllers: [AlbumController],
    providers: [AlbumService, AlbumRepository, TrackRepository, FavsRepository],
    exports: [AlbumRepository],
})
export class AlbumModule {

}
