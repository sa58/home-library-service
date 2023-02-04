import { Module } from '@nestjs/common';
import { FavsController } from './favs.controller';
import { FavsRepository } from './favs.repository';
import { FavsService } from './favs.service';

@Module({
    controllers: [FavsController],
    providers: [FavsService, FavsRepository]
})
export class FavsModule {

}
