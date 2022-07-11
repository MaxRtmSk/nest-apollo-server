import { Module } from '@nestjs/common';
import { FavouritesService } from './services/favourites.service';
import { FavouritesResolver } from './resolvers/favourites.resolver';
import { BandsModule } from "../bands/bands.module";
import { GenresModule } from '../genres/genres.module';
import { TracksModule } from "../tracks/tracks.module";
import { ArtistsModule } from "../artists/artists.module";

@Module({
  imports: [BandsModule, GenresModule, TracksModule, ArtistsModule],
  providers: [FavouritesService, FavouritesResolver],
  exports: [FavouritesModule],
})
export class FavouritesModule {}
