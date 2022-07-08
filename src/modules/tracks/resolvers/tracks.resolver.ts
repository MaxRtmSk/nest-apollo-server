import { Args, Query, Resolver } from '@nestjs/graphql';
import { TracksService } from '../services/tracks.service';
import { JWT } from '../../../common/decorators/jwt.decorator'

@Resolver('Track')
export class TracksResolver {
  constructor(private readonly tracksService: TracksService) {}

  @Query(() => String)
  async track(
    @JWT() jwt: any,
    @Args('id') id: string,
  ): Promise<{ title: any }> {
    console.log(jwt);
    const result = await this.tracksService.findOneById(id);
    return result;
  }
}
