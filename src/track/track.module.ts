import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AlbumService } from 'src/album/album.service';
import { ArtistService } from 'src/artist/artist.service';
import { AuthService } from 'src/auth/auth.service';
import { FavsService } from 'src/favs/favs.service';
import { PrismaService } from 'src/prisma.service';
import { TrackController } from './track.controller';
import { TrackService } from './track.service';

@Module({
  controllers: [TrackController],
  providers: [
    TrackService,
    FavsService,
    PrismaService,
    ArtistService,
    AlbumService,
    AuthService,
    JwtService
  ],
  exports: [TrackModule],
})
export class TrackModule {}
