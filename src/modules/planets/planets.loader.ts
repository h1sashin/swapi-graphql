import { Inject, Injectable, Scope } from '@nestjs/common';
import { CONTEXT } from '@nestjs/graphql';
import DataLoader from 'dataloader';
import { Planet } from './models/planet.model';
import { PlanetsService } from './planets.service';

@Injectable({ scope: Scope.REQUEST })
export class PlanetsLoader {
  constructor(
    @Inject(CONTEXT) private readonly context: any,
    private readonly planetsService: PlanetsService,
  ) {
    this.context.loaders.set(PlanetsLoader.name, this);
  }

  batchPlanets = new DataLoader<string, Planet>(async (keys) => {
    const planetUrls = Array.from(new Set(keys));
    const planets = await this.planetsService.getPlanetsByUrls(planetUrls);
    const map = new Map<string, Planet>(
      planets.map((planet) => [planet.url, planet]),
    );
    return keys.map((key) => map.get(key)!);
  });
}
