import { Resolver } from '@nestjs/graphql';
import { SpeciesService } from './species.service';

@Resolver()
export class SpeciesResolver {
  constructor(private readonly speciesService: SpeciesService) {}
}
