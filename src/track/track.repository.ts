import { Injectable } from "@nestjs/common";
import { v4 } from 'uuid';
import { TrackDto } from "./dto/track.dto";
import { TrackEntity } from "./track.entity";

export interface TrackAndPosition {
    track: TrackEntity; pos: number;
}

@Injectable()
export class TrackRepository {
    static tracks: TrackEntity[] = [];

    public findAll(): TrackEntity[] {
        return TrackRepository.tracks;
    }

    public findOne(uuid: string): TrackAndPosition {
        const pos = TrackRepository.tracks.findIndex(user => user.id === uuid);

        if(pos < 0) {
            return null;
        }

        const [track] =  TrackRepository.tracks.slice(pos, pos + 1);
        return {track, pos};
    }

    public create(track: TrackDto): TrackEntity {
        const newTrack = {
            ...track,
            id: v4(),
            artistId: track.artistId || null,
            albumId: track.albumId || null
        };

        TrackRepository.tracks.push(newTrack);
        return newTrack;
    }

    public delete(trackAndPosition: TrackAndPosition): void {
        const pos = trackAndPosition.pos;

        TrackRepository.tracks.splice(pos, 1);
    }

    public update(newTrack: TrackDto, trackAndPosition: TrackAndPosition): TrackEntity {
        const track = {
            ...trackAndPosition.track,
            ...newTrack
        };

        TrackRepository.tracks[trackAndPosition.pos] = track;

        return track;
    }
}
