import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ArtistService } from 'src/artist/artist.service';
import { AuthService } from 'src/auth/auth.service';
import { FavsService } from 'src/favs/favs.service';
import { PrismaService } from 'src/prisma.service';
import { TrackService } from 'src/track/track.service';
import { AlbumController } from './album.controller';
import { AlbumService } from './album.service';

@Module({
  controllers: [AlbumController],
  providers: [
    AlbumService,
    ArtistService,
    TrackService,
    FavsService,
    PrismaService,
    AuthService,
    JwtService
  ],
  exports: [AlbumModule],
})
export class AlbumModule {}
