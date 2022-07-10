import { forwardRef, Module } from '@nestjs/common';
import { ArtistsService } from './services/artists.service';
import { ArtistsResolver } from './resolvers/artists.resolver';
import { BandsModule } from '../bands/bands.module';

@Module({
  imports: [forwardRef(() => BandsModule)],
  providers: [ArtistsService, ArtistsResolver],
  exports: [ArtistsService],
})
export class ArtistsModule {}
