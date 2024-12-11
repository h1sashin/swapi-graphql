import { Inject, Injectable, Scope } from '@nestjs/common';
import { CONTEXT } from '@nestjs/graphql';
import DataLoader from 'dataloader';
import { StarshipsService } from './starships.service';
import { Starship } from './models/starship.model';

@Injectable({ scope: Scope.REQUEST })
export class StarshipsLoader {
  constructor(
    @Inject(CONTEXT) private readonly context: any,
    private readonly starshipsService: StarshipsService,
  ) {
    this.context.loaders.set(StarshipsLoader.name, this);
  }

  batchStarships = new DataLoader<string, Starship>(async (keys) => {
    const starshipUrls = Array.from(new Set(keys));
    const starships =
      await this.starshipsService.getStarshipsByUrls(starshipUrls);
    const map = new Map<string, Starship>(
      starships.map((starship) => [starship.url, starship]),
    );
    return keys.map((key) => map.get(key)!);
  });
}
