import { Injectable } from '@nestjs/common';
import { AlbumEntity } from 'src/album/album.entity';
import { ArtistEntity } from 'src/artist/artist.entity';
import { TrackEntity } from 'src/track/track.entity';
import { FavsEntity } from './favs.entity';

@Injectable()
export class FavsRepository {
  static favs: FavsEntity = {
    artists: [],
    albums: [],
    tracks: [],
  };

  public findAll(): FavsEntity {
    return FavsRepository.favs;
  }

  public addTrackToFavs(track: TrackEntity): void {
    FavsRepository.favs.tracks.push(track);
  }

  public deleteTrackFromFavs(uuid: string): void {
    const pos = FavsRepository.favs.tracks.findIndex((el) => el.id === uuid);
    console.log(pos, FavsRepository.favs.tracks);
    FavsRepository.favs.tracks.splice(pos, 1);

    console.log(pos, FavsRepository.favs.tracks);
  }

  public addArtistToFavs(artist: ArtistEntity): void {
    FavsRepository.favs.artists.push(artist);
  }

  public deleteArtistFromFavs(uuid: string): void {
    const pos = FavsRepository.favs.artists.findIndex((el) => el.id === uuid);

    FavsRepository.favs.artists.splice(pos, 1);
  }

  public addAlbumToFavs(album: AlbumEntity): void {
    FavsRepository.favs.albums.push(album);
  }

  public deleteAlbumFromFavs(uuid: string): void {
    const pos = FavsRepository.favs.albums.findIndex((el) => el.id === uuid);

    FavsRepository.favs.albums.splice(pos, 1);
  }
}
