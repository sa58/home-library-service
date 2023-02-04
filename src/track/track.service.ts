import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { TrackDto } from "./dto/track.dto";
import { TrackEntity } from "./track.entity";
import { TrackAndPosition, TrackRepository } from "./track.repository";

@Injectable()
export class TrackService {
    constructor(
        private readonly trackRepository: TrackRepository
    ) {}

    async findAll(): Promise<TrackEntity[]> {
        return this.trackRepository.findAll();
    }

    async findOne(uuid: string): Promise<TrackAndPosition> {
        const trackAndPosition = this.trackRepository.findOne(uuid);

        if(trackAndPosition === null) {
            throw new HttpException('NO_CONTENT', HttpStatus.NOT_FOUND);
        }

        return trackAndPosition;
    }

    async create(createTrackDto: TrackDto): Promise<TrackEntity> {
        return this.trackRepository.create(createTrackDto);
    }

    async delete(uuid: string): Promise<void> {
        const trackAndPosition = await this.findOne(uuid);

        this.trackRepository.delete(trackAndPosition);
    }

    async update(uuid: string, trackDto: TrackDto): Promise<TrackEntity> {
        const trackAndPosition = await this.findOne(uuid);

        return this.trackRepository.update(trackDto, trackAndPosition);
    }
}