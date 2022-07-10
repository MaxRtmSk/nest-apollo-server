import {
  Args,
  Context,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { ArtistsService } from '../services/artists.service';
// import { BandsService } from '../../bands/services/bands.service';
import { forwardRef, Inject } from '@nestjs/common';
import { BandsService } from "../../bands/services/bands.service";

interface Artist {
  _id: string;
  firstName: string;
  secondName: string;
  middleName: string;
  birthDate: string;
  birthPlace: string;
  country: string;
  bandsIds: string[];
  instruments: string[];
}

@Resolver('Artist')
export class ArtistsResolver {
  constructor(
    private readonly artistsService: ArtistsService,
    private readonly bandsService: BandsService,
  ) {}

  @Query(() => String)
  async artist(@Args('id') id: string): Promise<{ title: any }> {
    const result = await this.artistsService.findOneById(id);
    return result;
  }

  @Query(() => String)
  async artists(
    @Args('limit', { defaultValue: 5 }) limit: number,
    @Args('offset', { defaultValue: 0 }) offset: number,
  ): Promise<any> {
    const result = await this.artistsService.findAll(limit, offset);
    return result;
  }

  @Mutation()
  async createArtist(
    @Args('artist') artist: any,
    @Context('token') token: string,
  ): Promise<any> {
    return this.artistsService.create(artist, token);
  }

  @Mutation()
  async updateArtist(
    @Args('id') id: any,
    @Args('artist') artist: any,
    @Context('token') token: string,
  ): Promise<any> {
    return this.artistsService.update(id, artist, token);
  }

  @Mutation()
  async deleteArtist(
    @Args('id') id: any,
    @Context('token') token: string,
  ): Promise<any> {
    return this.artistsService.delete(id, token);
  }

  @ResolveField()
  async bands(@Parent() artist: any) {
    const { bandsIds } = artist;
    const result = await Promise.all(
      bandsIds.map(async (bandsId) => {
        return this.bandsService.findOneById(bandsId);
      }),
    );
    return result;
  }
}
