import { forwardRef, Module } from '@nestjs/common';
import { PlanetsService } from './planets.service';
import { PlanetsResolver } from './planets.resolver';
import { PlanetsLoader } from './planets.loader';
import { FilmsModule } from '@module/films/films.module';

@Module({
  imports: [forwardRef(() => FilmsModule)],
  providers: [PlanetsResolver, PlanetsService, PlanetsLoader],
  exports: [PlanetsService, PlanetsLoader],
})
export class PlanetsModule {}
