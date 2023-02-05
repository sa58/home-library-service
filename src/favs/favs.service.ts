import { HttpException, HttpStatus, Injectable, UnprocessableEntityException } from "@nestjs/common";
import { AlbumRepository } from "src/album/album.repository";
import { ArtistRepository } from "src/artist/artist.repository";
import { TrackRepository } from "src/track/track.repository";
import { FavsEntity } from "./favs.entity";
import { FavsRepository } from "./favs.repository";

@Injectable()
export class FavsService {
    constructor(
        private readonly favsRepository: FavsRepository,
        private readonly trackRepository: TrackRepository,
        private readonly artistRepository: ArtistRepository,
        private readonly albumRepository: AlbumRepository,

    ) {}

    async findAll(): Promise<FavsEntity> {
        return this.favsRepository.findAll();
    }
    
    async addTrackToFavs(uuid: string): Promise<void> {
        const trackAndPosition = this.trackRepository.findOne(uuid);

        if (trackAndPosition === null) {
            throw new HttpException('UNPROCESSABLE_ENTITY', HttpStatus.UNPROCESSABLE_ENTITY)
        }

        this.favsRepository.addTrackToFavs(trackAndPosition.track);
    }

    async deleteTrackFromFavs(uuid: string): Promise<void> {
        const trackAndPosition = this.trackRepository.findOne(uuid);
        
        if (trackAndPosition === null) {
            throw new HttpException('UNPROCESSABLE_ENTITY', HttpStatus.UNPROCESSABLE_ENTITY)
        }

        this.favsRepository.deleteTrackFromFavs(trackAndPosition.track.id);
    }

    async deleteArtistFromFavs(uuid: string): Promise<void> {
        const artist = this.artistRepository.findOne(uuid);
        
        if (artist === null) {
            throw new HttpException('UNPROCESSABLE_ENTITY', HttpStatus.UNPROCESSABLE_ENTITY)
        }

        this.favsRepository.deleteArtistFromFavs(artist.artist.id);
    }

    async addArtistToFavs(uuid: string): Promise<void> {
        const artistAndPosition = this.artistRepository.findOne(uuid);
        if (artistAndPosition === null) {
            throw new UnprocessableEntityException();
        }

        this.favsRepository.addArtistToFavs(artistAndPosition.artist);
    }

    async addAlbumToFavs(uuid: string): Promise<void> {
        const albumAndPosition = this.albumRepository.findOne(uuid);
        if (albumAndPosition === null) {
            throw new UnprocessableEntityException();
        }

        this.favsRepository.addAlbumToFavs(albumAndPosition.album);
    }

    async deleteAlbumFromFavs(uuid: string): Promise<void> {
        const albumAndPosition = this.albumRepository.findOne(uuid);
        
        if (albumAndPosition === null) {
            throw new HttpException('UNPROCESSABLE_ENTITY', HttpStatus.UNPROCESSABLE_ENTITY)
        }

        this.favsRepository.deleteAlbumFromFavs(albumAndPosition.album.id);
    }
}