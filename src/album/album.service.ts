import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AlbumDto } from './dto/album.dto';
import { AlbumRepository } from './album.repository';
import { AlbumEntity } from './album.entity';
import { AlbumAndPosition } from './types/album-and-position.type';
import { TrackRepository } from 'src/track/track.repository';
import { FavsRepository } from 'src/favs/favs.repository';

@Injectable()
export class AlbumService {
  constructor(
    private readonly albumRepository: AlbumRepository,
    private readonly trackRepository: TrackRepository,
    private readonly favsRepository: FavsRepository,
  ) {}

  async findAll(): Promise<AlbumEntity[]> {
    return this.albumRepository.findAll();
  }

  async findOne(uuid: string): Promise<AlbumAndPosition> {
    const albumAndPosition = this.albumRepository.findOne(uuid);

    const favs = this.favsRepository.findAll();
    const isFavExisted = favs.albums.filter((el) => el.id === uuid);

    if (isFavExisted.length) {
      this.favsRepository.deleteAlbumFromFavs(uuid);
    }

    if (albumAndPosition === null) {
      throw new HttpException('NOT_FOUND', HttpStatus.NOT_FOUND);
    }

    return albumAndPosition;
  }

  async create(createAlbumDto: AlbumDto): Promise<AlbumEntity> {
    return this.albumRepository.create(createAlbumDto);
  }

  async delete(uuid: string): Promise<void> {
    const albumAndPosition = await this.findOne(uuid);

    const tracks = this.trackRepository.findTracksByAlbumId(
      albumAndPosition.album.id,
    );

    if (tracks.length) {
      tracks.forEach((track) => {
        // TODO: get position is waste
        const trackAndPosition = this.trackRepository.findOne(track.id);

        const newTrack = {
          ...trackAndPosition.track,
          albumId: null,
        };

        this.trackRepository.update(newTrack, trackAndPosition);
      });
    }

    this.albumRepository.delete(albumAndPosition);
  }

  async update(uuid: string, albumDto: AlbumDto): Promise<AlbumEntity> {
    const albumAndPosition = await this.findOne(uuid);

    return this.albumRepository.update(albumDto, albumAndPosition);
  }
}
