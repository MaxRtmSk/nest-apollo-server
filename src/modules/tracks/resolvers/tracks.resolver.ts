import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { TracksService } from '../services/tracks.service';
import { VerifyGuard } from '../../../common/auth.guard';

@Resolver('Track')
export class TracksResolver {
  constructor(private readonly tracksService: TracksService) {}

  @Query(() => String)
  @UseGuards(VerifyGuard)
  async track(@Args('id') id: string): Promise<{ title: any }> {
    const result = await this.tracksService.findOneById(id);
    return result;
  }
}
