import { Args, Int, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { PlanetsService } from './planets.service';
import { PlanetModel } from './models/planet.model';
import { PlanetsPageModel } from './models/planets-page.model';
import { PageArgs } from '@common/graphql/page.args';

@Resolver(() => PlanetModel)
export class PlanetsResolver {
  constructor(private readonly planetsService: PlanetsService) {}

  @Query(() => PlanetsPageModel)
  planets(@Args() args: PageArgs) {}

  @Query(() => PlanetModel)
  planet(@Args('id', { type: () => Int }) id: number) {
    return this.planetsService.getPlanetById(id);
  }

  @ResolveField(() => String)
  async name() {}
}
