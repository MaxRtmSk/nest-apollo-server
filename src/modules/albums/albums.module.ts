import { forwardRef, Module } from '@nestjs/common';
import { AlbumsService } from './services/albums.service';
import { AlbumsResolver } from './resolvers/albums.resolver';
import { BandsModule } from '../bands/bands.module';
import { ArtistsModule } from '../artists/artists.module';
import { TracksModule } from '../tracks/tracks.module';
import { GenresModule } from '../genres/genres.module';

@Module({
  imports: [
    BandsModule,
    ArtistsModule,
    GenresModule,
    forwardRef(() => TracksModule),
  ],
  providers: [AlbumsService, AlbumsResolver],
  exports: [AlbumsService],
})
export class AlbumsModule {}
