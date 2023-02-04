import { AlbumEntity } from "src/album/album.entity";
import { ArtistEntity } from "src/artist/artist.entity";
import { TrackEntity } from "src/track/track.entity";

export class FavsEntity {
    artists: ArtistEntity[];
    albums: AlbumEntity[];
    tracks: TrackEntity[];
}
