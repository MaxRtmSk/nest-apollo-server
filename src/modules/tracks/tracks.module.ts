import { forwardRef, Module } from "@nestjs/common";
import { TracksResolver } from './resolvers/tracks.resolver';
import { TracksService } from './services/tracks.service';

import { AlbumsModule } from '../albums/albums.module';
import { BandsModule } from '../bands/bands.module';
import { GenresModule } from '../genres/genres.module';
import { ArtistsModule } from '../artists/artists.module';

@Module({
  imports: [
    BandsModule,
    GenresModule,
    ArtistsModule,
    forwardRef(() => AlbumsModule),
  ],
  providers: [TracksService, TracksResolver],
  exports: [TracksService],
})
export class TracksModule {}
