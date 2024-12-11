import {
  Args,
  Int,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { FilmsService } from './films.service';
import { PlanetsLoader } from '@module/planets/planets.loader';
import { FilmsPage } from './models/films-page.model';
import { PageArgs } from '@common/graphql/page.args';
import { swapiPageToPageInfo } from '@common/utils/swapiPageToPageInfo';
import { Film } from './models/film.model';
import { Planet } from '@module/planets/models/planet.model';
import { Vehicle } from '@module/vehicles/models/Vehicle.model';
import { VehiclesLoader } from '@module/vehicles/vehicles.loader';
import { StarshipsLoader } from '@module/starships/starships.loader';
import { SpeciesLoader } from '@module/species/species.loader';
import { Starship } from '@module/starships/models/starship.model';
import { Species } from '@module/species/models/species.model';
import { CrawlScan } from './models/crawl-scan.model';

@Resolver(() => Film)
export class FilmsResolver {
  constructor(
    private readonly filmsService: FilmsService,
    private readonly planetsLoader: PlanetsLoader,
    private readonly vehiclesLoader: VehiclesLoader,
    private readonly starshipsLoader: StarshipsLoader,
    private readonly speciesLoader: SpeciesLoader,
  ) {}

  @Query(() => FilmsPage)
  async films(@Args() { page, search }: PageArgs): Promise<FilmsPage> {
    const result = await this.filmsService.getFilms(page, search);
    return swapiPageToPageInfo(result, page);
  }

  @Query(() => Film, { nullable: true })
  getFilm(@Args('id', { type: () => Int }) id: number): Promise<Film | null> {
    return this.filmsService.getFilmById(id);
  }

  @Query(() => CrawlScan)
  crawlScan() {
    return this.filmsService.scanCrawl();
  }

  @ResolveField(() => [Planet])
  planets(@Parent() film: Film): Promise<Planet[]> {
    return this.planetsLoader.batchPlanets.loadMany(film.planets) as Promise<
      Planet[]
    >;
  }

  @ResolveField(() => [Vehicle])
  vehicles(@Parent() film: Film): Promise<Vehicle[]> {
    return this.vehiclesLoader.batchVehicles.loadMany(film.vehicles) as Promise<
      Vehicle[]
    >;
  }

  @ResolveField(() => [Starship])
  starships(@Parent() film: Film): Promise<Starship[]> {
    return this.starshipsLoader.batchStarships.loadMany(
      film.starships,
    ) as Promise<Starship[]>;
  }

  @ResolveField(() => [Species])
  species(@Parent() film: Film): Promise<Species[]> {
    return this.speciesLoader.batchSpecies.loadMany(film.species) as Promise<
      Species[]
    >;
  }
}
