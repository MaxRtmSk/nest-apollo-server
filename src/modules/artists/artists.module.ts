import { Module } from '@nestjs/common';
import { ArtistsService } from './services/artists.service';
import { ArtistsResolver } from './resolvers/artists.resolver';

@Module({
  imports: [],
  providers: [ArtistsService, ArtistsResolver],
  exports: [ArtistsService],
})
export class ArtistsModule {}
