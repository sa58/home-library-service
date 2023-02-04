import { Module } from '@nestjs/common';
import { TrackController } from './track.controller';
import { TrackRepository } from './track.repository';
import { TrackService } from './track.service';

@Module({
    controllers: [TrackController],
    providers: [TrackService, TrackRepository]
})
export class TrackModule {

}
