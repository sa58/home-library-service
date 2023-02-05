import { Module } from '@nestjs/common';
import { FavsRepository } from 'src/favs/favs.repository';
import { TrackController } from './track.controller';
import { TrackRepository } from './track.repository';
import { TrackService } from './track.service';

@Module({
    controllers: [TrackController],
    providers: [TrackService, TrackRepository, FavsRepository],
    exports: [TrackRepository],
})
export class TrackModule {

}
