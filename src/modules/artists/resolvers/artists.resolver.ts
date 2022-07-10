import { UseGuards } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { ArtistsService } from '../services/artists.service';
import { VerifyGuard } from '../../../common/auth.guard';

@Resolver('Artist')
export class ArtistsResolver {
  constructor(private readonly albumsService: ArtistsService) {}

  @Query(() => String)
  async artist(@Args('id') id: string): Promise<{ title: any }> {
    const result = await this.albumsService.findOneById(id);
    return result;
  }

  @Query(() => String)
  async artists(): Promise<any> {
    const result = await this.albumsService.findAll();
    return result;
  }
}
