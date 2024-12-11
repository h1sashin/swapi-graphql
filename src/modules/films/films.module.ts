import { forwardRef, Module } from '@nestjs/common';
import { FilmsService } from './films.service';
import { FilmsResolver } from './films.resolver';
import { FilmsLoader } from './films.loader';
import { PlanetsModule } from '@module/planets/planets.module';
import { StarshipsModule } from '@module/starships/starships.module';
import { VehiclesModule } from '@module/vehicles/vehicles.module';
import { SpeciesModule } from '@module/species/species.module';
import { PeopleModule } from '@module/people/people.module';

@Module({
  imports: [
    forwardRef(() => PlanetsModule),
    forwardRef(() => StarshipsModule),
    forwardRef(() => VehiclesModule),
    forwardRef(() => SpeciesModule),
    PeopleModule,
  ],
  providers: [FilmsResolver, FilmsService, FilmsLoader],
  exports: [FilmsService, FilmsLoader],
})
export class FilmsModule {}
