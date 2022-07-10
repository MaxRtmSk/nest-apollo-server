import {
  Args,
  Context,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

import { BandsService } from '../services/bands.service';
import { GenresService } from '../../genres/services/genres.service';
import { ArtistsService } from '../../artists/services/artists.service';

@Resolver('Band')
export class BandsResolver {
  constructor(
    private readonly bandsService: BandsService,
    private readonly genresService: GenresService,
    private readonly artistsService: ArtistsService,
  ) {}

  @Query(() => String)
  async band(@Args('id') id: string): Promise<{ title: any }> {
    const result = await this.bandsService.findOneById(id);
    return result;
  }

  @Query(() => String)
  async bands(
    @Args('limit', { defaultValue: 5 }) limit: number,
    @Args('offset', { defaultValue: 0 }) offset: number,
  ): Promise<any> {
    const result = await this.bandsService.findAll(limit, offset);
    return result;
  }

  @Mutation()
  async createBand(
    @Args('band') band: any,
    @Context('token') token: string,
  ): Promise<any> {
    return this.bandsService.create(band, token);
  }

  @Mutation()
  async updateBand(
    @Args('id') id: any,
    @Args('band') band: any,
    @Context('token') token: string,
  ): Promise<any> {
    return this.bandsService.update(id, band, token);
  }

  @Mutation()
  async deleteBand(
    @Args('id') id: any,
    @Context('token') token: string,
  ): Promise<any> {
    return this.bandsService.delete(id, token);
  }

  @ResolveField()
  async genres(@Parent() band: any) {
    const { genresIds } = band;
    const result = await Promise.all(
      genresIds.map(async (genreId) => {
        return this.genresService.findOneById(genreId);
      }),
    );
    return result;
  }

  @ResolveField()
  async members(@Parent() band: any) {
    const { members } = band;
    const result = await Promise.all(
      members.map(async (member) => {
        const artist = await this.artistsService.findOneById(member.id);
        return {
          ...artist,
          instrument: member.instrument,
          years: member.years,
        };
      }),
    );

    return result;
  }
}
