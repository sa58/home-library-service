import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ArtistDto } from "./dto/artist.dto";
import { ArtistEntity } from "./artist.entity";
import { ArtistAndPosition, ArtistRepository } from "./artist.repository";
import { TrackRepository } from "src/track/track.repository";

@Injectable()
export class ArtistService {
    constructor(
        private readonly artistRepository: ArtistRepository,
        private readonly trackRepository: TrackRepository
    ) {}

    async findAll(): Promise<ArtistEntity[]> {
        return this.artistRepository.findAll();
    }

    async findOne(uuid: string): Promise<ArtistAndPosition> {
        const artistAndPosition = this.artistRepository.findOne(uuid);

        if(artistAndPosition === null) {
            throw new HttpException('NO_CONTENT', HttpStatus.NOT_FOUND);
        }

        return artistAndPosition;
    }

    async create(createArtistDto: ArtistDto): Promise<ArtistEntity> {
        return this.artistRepository.create(createArtistDto);
    }

    async delete(uuid: string): Promise<void> {
        const artistAndPosition = await this.findOne(uuid);

        const tracks = this.trackRepository.findTracksByArtistId(artistAndPosition.artist.id)
        console.log(tracks)

        if(tracks.length) {
            tracks.forEach(track => {
                // TODO: get position is waste
                const trackAndPosition = this.trackRepository.findOne(track.id);

                const newTrack = {
                    ...trackAndPosition.track,
                    artistId: null
                }

                this.trackRepository.update(newTrack, trackAndPosition);
            })
        }

        this.artistRepository.delete(artistAndPosition);

    }

    async update(uuid: string, artistDto: ArtistDto): Promise<ArtistEntity> {
        const artistAndPosition = await this.findOne(uuid);

        return this.artistRepository.update(artistDto, artistAndPosition);
    }
}