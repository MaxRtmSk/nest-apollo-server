import {
  Args,
  Context,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { TracksService } from '../services/tracks.service';
import { GenresService } from '../../genres/services/genres.service';
import { AlbumsService } from '../../albums/services/albums.service';
import { ArtistsService } from '../../artists/services/artists.service';
import { BandsService } from '../../bands/services/bands.service';
import { forwardRef, Inject } from "@nestjs/common";

interface Track {
  _id: string;
  title: string;
  albumId: string;
  artistsIds: string[];
  bandsIds: string[];
  duration: number;
  released: number;
  genresIds: string[];
}

@Resolver('Track')
export class TracksResolver {
  constructor(
    private readonly tracksService: TracksService,
    private readonly genresService: GenresService,
    private readonly albumsService: AlbumsService,
    private readonly artistsService: ArtistsService,
    @Inject(forwardRef(() => BandsService))
    private readonly bandsService: BandsService,
  ) {}

  @Query(() => String)
  async track(@Args('id') id: string): Promise<{ title: any }> {
    const result = await this.tracksService.findOneById(id);
    return result;
  }

  @Query(() => String)
  async tracks(
    @Args('limit', { defaultValue: 5 }) limit: number,
    @Args('offset', { defaultValue: 0 }) offset: number,
  ): Promise<any> {
    const result = await this.tracksService.findAll(limit, offset);
    return result;
  }

  @Mutation()
  async createTrack(
    @Args('track') track: any,
    @Context('token') token: string,
  ): Promise<any> {
    return this.tracksService.create(track, token);
  }

  @Mutation()
  async updateTrack(
    @Args('id') id: any,
    @Args('track') track: any,
    @Context('token') token: string,
  ): Promise<any> {
    return this.tracksService.update(id, track, token);
  }

  @Mutation()
  async deleteTrack(
    @Args('id') id: any,
    @Context('token') token: string,
  ): Promise<any> {
    return this.tracksService.delete(id, token);
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
  async artists(@Parent() band: any) {
    const { artistsIds } = band;
    const result = await Promise.all(
      artistsIds.map(async (artistId) => {
        return this.artistsService.findOneById(artistId);
      }),
    );
    return result;
  }

  @ResolveField()
  async album(@Parent() band: any) {
    const { albumId } = band;
    const result = await this.albumsService.findOneById(albumId);
    return result;
  }

  @ResolveField()
  async bands(@Parent() band: any) {
    const { bandsIds } = band;
    const result = await Promise.all(
      bandsIds.map(async (bandId) => {
        return this.bandsService.findOneById(bandId);
      }),
    );
    return result;
  }
}
