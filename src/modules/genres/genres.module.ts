import { Module } from '@nestjs/common';
import { GenresService } from './services/genres.service';
import { GenresResolver } from './resolvers/genres.resolver';

@Module({
  imports: [],
  providers: [GenresService, GenresResolver],
  exports: [GenresService],
})
export class GenresModule {}
