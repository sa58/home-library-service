import { ArtistEntity } from '../artist.entity';

export interface ArtistAndPosition {
  user: ArtistEntity;
  pos: number;
}
