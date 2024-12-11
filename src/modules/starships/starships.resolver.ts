import {
  Args,
  Int,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { StarshipsService } from './starships.service';
import { FilmsLoader } from '@module/films/films.loader';
import { Film } from '@module/films/models/film.model';
import { Starship } from './models/starship.model';
import { swapiPageToPageInfo } from '@common/utils/swapiPageToPageInfo';
import { StarshipsPage } from './models/starships-page.model';
import { PageArgs } from '@common/graphql/page.args';

@Resolver(() => Starship)
export class StarshipsResolver {
  constructor(
    private readonly starshipsService: StarshipsService,
    private readonly filmsLoader: FilmsLoader,
  ) {}

  @Query(() => StarshipsPage)
  async starships(@Args() { page, search }: PageArgs): Promise<StarshipsPage> {
    const result = await this.starshipsService.getStarships(page, search);
    return swapiPageToPageInfo(result, page);
  }

  @Query(() => Starship, { nullable: true })
  getStarship(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Starship | null> {
    return this.starshipsService.getStarshipById(id);
  }

  @ResolveField(() => [Film])
  films(@Parent() Starships: Starship): Promise<Film[]> {
    return this.filmsLoader.batchFilms.loadMany(Starships.films) as Promise<
      Film[]
    >;
  }
}
