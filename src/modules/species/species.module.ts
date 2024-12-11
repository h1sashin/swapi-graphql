import { forwardRef, Module } from '@nestjs/common';
import { SpeciesService } from './species.service';
import { SpeciesResolver } from './species.resolver';
import { FilmsModule } from '@module/films/films.module';
import { SpeciesLoader } from './species.loader';

@Module({
  imports: [forwardRef(() => FilmsModule)],
  providers: [SpeciesResolver, SpeciesService, SpeciesLoader],
  exports: [SpeciesService, SpeciesLoader],
})
export class SpeciesModule {}
