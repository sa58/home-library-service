import { Injectable } from "@nestjs/common";
import { v4 } from 'uuid';
import { ArtistDto } from "./dto/artist.dto";
import { ArtistEntity } from "./artist.entity";

export interface ArtistAndPosition {
    artist: ArtistEntity; pos: number;
}

@Injectable()
export class ArtistRepository {
    static artists: ArtistEntity[] = [];

    public findAll(): ArtistEntity[] {
        return ArtistRepository.artists;
    }

    public findOne(uuid: string): ArtistAndPosition {
        const pos = ArtistRepository.artists.findIndex(user => user.id === uuid);

        if(pos < 0) {
            return null;
        }

        const [artist] =  ArtistRepository.artists.slice(pos, pos + 1);
        return {artist, pos};
    }

    public create(artist: ArtistDto): ArtistEntity {
        const newArtist = {
            ...artist,
            id: v4()
        };

        ArtistRepository.artists.push(newArtist);
        return newArtist;
    }

    public delete(artistAndPosition: ArtistAndPosition): void {
        const pos = artistAndPosition.pos;

        ArtistRepository.artists.splice(pos, 1);
    }

    public update(newArtist: ArtistDto, artistAndPosition: ArtistAndPosition): ArtistEntity {
        const artist = {
            ...artistAndPosition.artist,
            ...newArtist
        };

        ArtistRepository.artists[artistAndPosition.pos] = artist;

        return artist;
    }
}
