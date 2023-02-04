import { Injectable } from "@nestjs/common";
import { v4 } from 'uuid';
import { AlbumDto } from "./dto/album.dto";
import { AlbumEntity } from "./album.entity";
import { AlbumAndPosition } from "./types/album-and-position.type";

@Injectable()
export class AlbumRepository {
    static artists: AlbumEntity[] = [];

    public findAll(): AlbumEntity[] {
        return AlbumRepository.artists;
    }

    public findOne(uuid: string): AlbumAndPosition {
        const pos = AlbumRepository.artists.findIndex(user => user.id === uuid);

        if(pos < 0) {
            return null;
        }

        const [album] =  AlbumRepository.artists.slice(pos, pos + 1);
        return {album, pos};
    }

    public create(artist: AlbumDto): AlbumEntity {
        const newAlbum = {
            ...artist,
            id: v4()
        };

        AlbumRepository.artists.push(newAlbum);
        return newAlbum;
    }

    public delete(artistAndPosition: AlbumAndPosition): void {
        const pos = artistAndPosition.pos;

        AlbumRepository.artists.splice(pos, 1);
    }

    public update(newAlbum: AlbumDto, artistAndPosition: AlbumAndPosition): AlbumEntity {
        const artist = {
            ...artistAndPosition.album,
            ...newAlbum
        };

        AlbumRepository.artists[artistAndPosition.pos] = artist;

        return artist;
    }
}
