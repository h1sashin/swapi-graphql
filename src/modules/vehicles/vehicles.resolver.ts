import {
  Args,
  Int,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { VehiclesService } from './vehicles.service';
import { Vehicle } from './models/Vehicle.model';
import { PageArgs } from '@common/graphql/page.args';
import { FilmsLoader } from '@module/films/films.loader';
import { VehiclesPage } from './models/vehicles-page.model';
import { swapiPageToPageInfo } from '@common/utils/swapiPageToPageInfo';
import { Film } from '@module/films/models/film.model';

@Resolver(() => Vehicle)
export class VehiclesResolver {
  constructor(
    private readonly vehiclesService: VehiclesService,
    private readonly filmsLoader: FilmsLoader,
  ) {}

  @Query(() => VehiclesPage)
  async vehicles(@Args() { page, search }: PageArgs): Promise<VehiclesPage> {
    const result = await this.vehiclesService.getVehicles(page, search);
    return swapiPageToPageInfo(result, page);
  }

  @Query(() => Vehicle, { nullable: true })
  getVehicle(
    @Args('id', { type: () => Int }) id: number,
  ): Promise<Vehicle | null> {
    return this.vehiclesService.getVehicleById(id);
  }

  @ResolveField(() => [Film])
  films(@Parent() Vehicles: Vehicle): Promise<Film[]> {
    return this.filmsLoader.batchFilms.loadMany(Vehicles.films) as Promise<
      Film[]
    >;
  }
}
