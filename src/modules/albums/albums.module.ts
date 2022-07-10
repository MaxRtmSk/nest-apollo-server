import { Module } from '@nestjs/common';
import { AlbumsService } from './services/albums.service';
import { AlbumsResolver } from './resolvers/albums.resolver';
import { ArtistsService } from '../artists/services/artists.service';

@Module({
  imports: [],
  providers: [AlbumsService, AlbumsResolver, ArtistsService],
  exports: [AlbumsService],
})
export class AlbumsModule {}
