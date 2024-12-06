import { Module } from '@nestjs/common';
import { SpeciesService } from './species.service';
import { SpeciesResolver } from './species.resolver';

@Module({
  providers: [SpeciesResolver, SpeciesService],
})
export class SpeciesModule {}
