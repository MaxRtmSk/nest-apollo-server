import {
  Args,
  Context,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

import { AlbumsService } from '../services/albums.service';
import { ArtistsService } from '../../artists/services/artists.service';
import { TracksService } from '../../tracks/services/tracks.service';
import { BandsService } from '../../bands/services/bands.service';
import { GenresService } from '../../genres/services/genres.service';

interface Album {
  _id: string;
  name: string;
  released: number;
  artistsIds: string[];
  bandsIds: string[];
  trackIds: string[];
  genresIds: string[];
  image: string;
}

@Resolver('Album')
export class AlbumsResolver {
  constructor(
    private readonly albumsService: AlbumsService,
    private readonly artistsService: ArtistsService,
    private readonly trackService: TracksService,
    private readonly bandService: BandsService,
    private readonly genresService: GenresService,
  ) {}

  @Query(() => String)
  async album(@Args('id') id: string): Promise<{ title: any }> {
    const result = await this.albumsService.findOneById(id);
    return result;
  }

  @Query(() => String)
  async albums(
    @Args('limit', { defaultValue: 5 }) limit: number,
    @Args('offset', { defaultValue: 0 }) offset: number,
  ): Promise<any> {
    const result = await this.albumsService.findAll(limit, offset);
    return result;
  }

  @Mutation()
  async createAlbum(
    @Args('album') album: any,
    @Context('token') token: string,
  ): Promise<any> {
    return this.albumsService.create(album, token);
  }

  @Mutation()
  async updateAlbum(
    @Args('id') id: any,
    @Args('album') album: any,
    @Context('token') token: string,
  ): Promise<any> {
    return this.albumsService.update(id, album, token);
  }

  @Mutation()
  async deleteAlbum(
    @Args('id') id: any,
    @Context('token') token: string,
  ): Promise<any> {
    return this.albumsService.delete(id, token);
  }

  @ResolveField()
  async artists(@Parent() album: any) {
    const { artistsIds } = album;
    console.log(artistsIds);
    const result = await Promise.all(
      artistsIds.map(async (artistsId) => {
        console.log('artistsId', artistsId);
        return this.artistsService.findOneById(artistsId);
      }),
    );
    return result;
  }

  @ResolveField()
  async bands(@Parent() album: any) {
    const { bandsIds } = album;
    const result = await Promise.all(
      bandsIds.map(async (bandsId) => {
        return this.bandService.findOneById(bandsId);
      }),
    );
    return result;
  }

  @ResolveField()
  async genres(@Parent() album: any) {
    const { genresIds } = album;
    const result = await Promise.all(
      genresIds.map(async (genresId) => {
        return this.genresService.findOneById(genresId);
      }),
    );
    return result;
  }

  @ResolveField()
  async tracks(@Parent() album: any) {
    const { trackIds } = album;
    const result = await Promise.all(
      trackIds.map(async (trackId) => {
        return this.trackService.findOneById(trackId);
      }),
    );
    return result;
  }
}
