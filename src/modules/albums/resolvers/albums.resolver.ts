import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';

import { AlbumsService } from '../services/albums.service';
import { ArtistsService } from '../../artists/services/artists.service';
import { VerifyGuard } from '../../../common/auth.guard';

@Resolver('Album')
export class AlbumsResolver {
  constructor(
    private readonly albumsService: AlbumsService,
    private readonly artistsService: ArtistsService,
  ) {}

  @Query(() => String)
  async album(@Args('id') id: string): Promise<{ title: any }> {
    const result = await this.albumsService.findOneById(id);
    return result;
  }

  @Query(() => String)
  async albums(): Promise<any> {
    const result = await this.albumsService.findAll();
    return result;
  }

  @ResolveField()
  async artists(@Parent() author: any) {
    const { artistsIds } = author;
    const result = await Promise.all(
      artistsIds.map(async (artistsId) => {
        return this.artistsService.findOneById(artistsId);
      }),
    );
    return result;
  }
}
