import { Args, Query, Resolver } from '@nestjs/graphql';
import { TracksService } from '../services/tracks.service';

@Resolver('Track')
export class TracksResolver {
  constructor(private readonly tracksService: TracksService) {}

  @Query(() => String)
  async track(@Args('id') id: string): Promise<string> {
    return 'this.tracksService.findOneById(id)';
  }
}
