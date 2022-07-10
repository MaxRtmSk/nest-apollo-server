import { Module } from '@nestjs/common';
import { TracksResolver } from './resolvers/tracks.resolver';
import { TracksService } from './services/tracks.service';

import { AlbumsModule } from '../albums/albums.module';
import { BandsModule } from '../bands/bands.module';
import { GenresModule } from '../genres/genres.module';
import { ArtistsModule } from '../artists/artists.module';

@Module({
  imports: [AlbumsModule, BandsModule, GenresModule, ArtistsModule],
  providers: [TracksService, TracksResolver],
  exports: [TracksService],
})
export class TracksModule {}
