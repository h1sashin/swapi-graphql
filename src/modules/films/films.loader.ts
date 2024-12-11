import { Inject, Injectable, Scope } from '@nestjs/common';
import { CONTEXT } from '@nestjs/graphql';
import DataLoader from 'dataloader';
import { Film } from './models/film.model';
import { FilmsService } from './films.service';

@Injectable({ scope: Scope.REQUEST })
export class FilmsLoader {
  constructor(
    @Inject(CONTEXT) private readonly context: any,
    private readonly filmsService: FilmsService,
  ) {
    this.context.loaders.set(FilmsLoader.name, this);
  }

  batchFilms = new DataLoader<string, Film>(async (keys) => {
    const filmUrls = Array.from(new Set(keys));
    const films = await this.filmsService.getFilmsByUrls(filmUrls);
    const map = new Map<string, Film>(films.map((film) => [film.url, film]));
    return keys.map((key) => map.get(key)!);
  });
}
