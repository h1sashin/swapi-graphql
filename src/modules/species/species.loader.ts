import { Inject, Injectable, Scope } from '@nestjs/common';
import { CONTEXT } from '@nestjs/graphql';
import DataLoader from 'dataloader';
import { Species } from './models/species.model';
import { SpeciesService } from './species.service';

@Injectable({ scope: Scope.REQUEST })
export class SpeciesLoader {
  constructor(
    @Inject(CONTEXT) private readonly context: any,
    private readonly speciesServicee: SpeciesService,
  ) {
    this.context.loaders.set(SpeciesLoader.name, this);
  }

  batchSpecies = new DataLoader<string, Species>(async (keys) => {
    const speciesUrls = Array.from(new Set(keys));
    const species = await this.speciesServicee.getSpeciesByUrls(speciesUrls);
    const map = new Map<string, Species>(
      species.map((species) => [species.url, species]),
    );
    return keys.map((key) => map.get(key)!);
  });
}
