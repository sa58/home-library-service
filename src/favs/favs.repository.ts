import { Injectable } from "@nestjs/common";
import { FavsEntity } from "./favs.entity";

@Injectable()
export class FavsRepository {
    static favs: FavsEntity = {
        artists: [],
        albums: [],
        tracks: []
    };

    public findAll(): FavsEntity {
        return FavsRepository.favs;
    }
}
