import { Module } from '@nestjs/common';
import { TracksResolver } from './resolvers/tracks.resolver';
import { TracksService } from './services/tracks.service';

@Module({
  imports: [],
  providers: [TracksService, TracksResolver],
  exports: [TracksService],
})
export class TracksModule {}
