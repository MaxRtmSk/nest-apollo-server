import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';

import { GenresService } from '../services/genres.service';

@Resolver('Genres')
export class GenresResolver {
  constructor(private readonly genresService: GenresService) {}

  @Query(() => String)
  async genre(@Args('id') id: string): Promise<{ title: any }> {
    const result = await this.genresService.findOneById(id);
    return result;
  }

  @Query(() => String)
  async genres(
    @Args('limit', { defaultValue: 5 }) limit: number,
    @Args('offset', { defaultValue: 0 }) offset: number,
  ): Promise<any> {
    const result = await this.genresService.findAll(limit, offset);
    return result;
  }

  @Mutation()
  async createGenre(
    @Args('genre') genre: any,
    @Context('token') token: string,
  ): Promise<any> {
    return this.genresService.create(genre, token);
  }

  @Mutation()
  async updateGenre(
    @Args('id') id: any,
    @Args('genre') genre: any,
    @Context('token') token: string,
  ): Promise<any> {
    return this.genresService.update(id, genre, token);
  }

  @Mutation()
  async deleteGenre(
    @Args('id') id: any,
    @Context('token') token: string,
  ): Promise<any> {
    return this.genresService.delete(id, token);
  }
}
