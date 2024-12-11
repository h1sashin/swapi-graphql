import {
  Args,
  Int,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { SpeciesService } from './species.service';
import { FilmsLoader } from '@module/films/films.loader';
import { SpeciesPage } from './models/species-page.model';
import { Species } from './models/species.model';
import { swapiPageToPageInfo } from '@common/utils/swapiPageToPageInfo';
import { PageArgs } from '@common/graphql/page.args';
import { Film } from '@module/films/models/film.model';

@Resolver(() => Species)
export class SpeciesResolver {
  constructor(
    private readonly speciesService: SpeciesService,
    private readonly filmsLoader: FilmsLoader,
  ) {}

  @Query(() => SpeciesPage)
  async species(@Args() { page, search }: PageArgs): Promise<SpeciesPage> {
    const result = await this.speciesService.getSpecies(page, search);
    return swapiPageToPageInfo(result, page);
  }

  @Query(() => Species, { nullable: true })
  getSpecies(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Species | null> {
    return this.speciesService.getSpeciesById(id);
  }

  @ResolveField(() => [Film])
  films(@Parent() species: Species): Promise<Film[]> {
    return this.filmsLoader.batchFilms.loadMany(species.films) as Promise<
      Film[]
    >;
  }
}
