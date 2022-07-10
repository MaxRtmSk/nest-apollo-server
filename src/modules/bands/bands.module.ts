import { forwardRef, Module } from '@nestjs/common';
import { BandsResolver } from './resolvers/bands.resolver';
import { BandsService } from './services/bands.service';
import { GenresModule } from '../genres/genres.module';
import { ArtistsModule } from '../artists/artists.module';

@Module({
  imports: [GenresModule, forwardRef(() => ArtistsModule)],
  providers: [BandsService, BandsResolver],
  exports: [BandsService],
})
export class BandsModule {}
