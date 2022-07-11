import {
  Context,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

import { FavouritesService } from '../services/favourites.service';
import { ArtistsService } from '../../artists/services/artists.service';
import { TracksService } from '../../tracks/services/tracks.service';
import { BandsService } from '../../bands/services/bands.service';
import { GenresService } from '../../genres/services/genres.service';

interface Favorite {
  _id: string;
  userId: string;
  bandsIds: string[];
  genresIds: string[];
  artistsIds: string[];
  tracksIds: string[];
}

@Resolver('Favourites')
export class FavouritesResolver {
  constructor(
    private readonly favouritesService: FavouritesService,
    private readonly artistsService: ArtistsService,
    private readonly trackService: TracksService,
    private readonly bandService: BandsService,
    private readonly genresService: GenresService,
  ) {}

  @Query(() => String)
  async favourites(@Context('token') token: string): Promise<{ title: any }> {
    const result = await this.favouritesService.getFavourites(token);
    return result;
  }

  @ResolveField()
  async artists(@Parent() favourit: any) {
    const { artistsIds } = favourit;
    console.log(artistsIds);
    const result = await Promise.all(
      artistsIds.map(async (artistsId) => {
        return this.artistsService.findOneById(artistsId);
      }),
    );
    return result;
  }

  @ResolveField()
  async bands(@Parent() favourit: any) {
    const { bandsIds } = favourit;
    const result = await Promise.all(
      bandsIds.map(async (bandsId) => {
        return this.bandService.findOneById(bandsId);
      }),
    );
    return result;
  }

  @ResolveField()
  async genres(@Parent() favourit: any) {
    const { genresIds } = favourit;
    const result = await Promise.all(
      genresIds.map(async (genresId) => {
        return this.genresService.findOneById(genresId);
      }),
    );
    return result;
  }

  @ResolveField()
  async tracks(@Parent() favourit: any) {
    const { trackIds } = favourit;
    const result = await Promise.all(
      trackIds.map(async (trackId) => {
        return this.trackService.findOneById(trackId);
      }),
    );
    return result;
  }
}
