import {
  Args,
  Int,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { PlanetsService } from './planets.service';
import { Planet } from './models/planet.model';
import { PlanetsPageModel } from './models/planets-page.model';
import { PageArgs } from '@common/graphql/page.args';
import { FilmsLoader } from '@module/films/films.loader';
import { Film } from '@module/films/models/film.model';
import { swapiPageToPageInfo } from '@common/utils/swapiPageToPageInfo';

@Resolver(() => Planet)
export class PlanetsResolver {
  constructor(
    private readonly planetsService: PlanetsService,
    private readonly filmsLoader: FilmsLoader,
  ) {}

  @Query(() => PlanetsPageModel)
  async planets(@Args() { page, search }: PageArgs): Promise<PlanetsPageModel> {
    const result = await this.planetsService.getPlanets(page, search);
    return swapiPageToPageInfo(result, page);
  }

  @Query(() => Planet, { nullable: true })
  planet(@Args('id', { type: () => Int }) id: number): Promise<Planet | null> {
    return this.planetsService.getPlanetById(id);
  }

  @ResolveField(() => [Film])
  films(@Parent() planet: Planet): Promise<Film[]> {
    return this.filmsLoader.batchFilms.loadMany(planet.films) as Promise<
      Film[]
    >;
  }
}
