import { Injectable } from '@nestjs/common';
import { Film } from './models/film.model';
import { HttpService } from '@nestjs/axios';
import { catchError, lastValueFrom, map, of } from 'rxjs';
import { AxiosError } from 'axios';
import { SWapiPage } from '@common/types';
import { PeopleService } from '@module/people/people.service';
import { isRegExp } from 'util';
import { writeFileSync } from 'fs';
import { CrawlScan } from './models/crawl-scan.model';

@Injectable()
export class FilmsService {
  constructor(
    private readonly httpService: HttpService,
    private readonly peopleService: PeopleService,
  ) {}

  getFilmById(id: number): Promise<Film | null> {
    return lastValueFrom(
      this.httpService.get<Film>(`films/${id}`).pipe(
        map((res) => res.data),
        catchError((error: AxiosError) => {
          if (error.status === 404) return of(null);
          throw error.message;
        }),
      ),
    );
  }

  getAllFilms(): Promise<Film[]> {
    const recursiveGetPeople = async (
      url: string,
      films: Film[] = [],
    ): Promise<Film[]> => {
      const response = await lastValueFrom(
        this.httpService.get<SWapiPage<Film>>(url),
      );
      films = films.concat(response.data.results);
      if (response.data.next)
        return recursiveGetPeople(response.data.next, films);
      return films;
    };
    return recursiveGetPeople('films');
  }

  getFilms(page: number = 1, search?: string): Promise<SWapiPage<Film>> {
    return lastValueFrom(
      this.httpService
        .get<SWapiPage<Film>>('films', { params: { search, page } })
        .pipe(
          map((res) => res.data),
          catchError((error: AxiosError) => {
            throw error.message;
          }),
        ),
    );
  }

  getFilmByUrl(url: string): Promise<Film | null> {
    return lastValueFrom(
      this.httpService.get<Film>(url).pipe(
        map((res) => res.data),
        catchError((error: AxiosError) => {
          if (error.status === 404) return of(null);
          throw error.message;
        }),
      ),
    );
  }

  async getFilmsByUrls(urls: string[]): Promise<Film[]> {
    const result = await Promise.allSettled(
      urls.map((url) => this.getFilmByUrl(url)),
    );
    return result
      .map((res) => (res.status === 'fulfilled' ? res.value : null))
      .filter(Boolean) as Film[];
  }

  scanCrawl = async (): Promise<CrawlScan> => {
    const [films, people] = await Promise.all([
      this.getAllFilms(),
      this.peopleService.getAllPeople(),
    ]);

    const text = films.reduce(
      (acc, film) => [acc, film.opening_crawl].join(' '),
      '',
    );

    const peopleNames = people.map((person) => person.name);

    const mostOccuringCharacter = peopleNames
      .map((name) => {
        const escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(`\\b${escapedName}\\b`, 'gi');
        const matches = text.match(regex);
        return { name, occurrences: matches?.length ?? 0 };
      })
      .reduce<{ name: string; occurrences: number }[]>((acc, curr) => {
        if (acc.length === 0) return [curr];
        const maxOccurrences = acc[0].occurrences;
        if (curr.occurrences > maxOccurrences) return [curr];
        if (curr.occurrences === maxOccurrences) acc.push(curr);

        return acc;
      }, []);

    const filtered = text.replaceAll(/[^a-zA-Z0-9' ]/g, '').toLowerCase();

    const wordsMap: Record<string, number> = {};

    filtered.split(/\s+/).forEach((word) => {
      if (!word) return;
      if (wordsMap[word]) wordsMap[word]++;
      else wordsMap[word] = 1;
    });

    return {
      crawlWordOccurrencyList: Object.entries(wordsMap)
        .map(([word, occurrencies]) => ({
          occurrencies,
          word,
        }))
        .sort((a, b) => b.occurrencies - a.occurrencies),
      mostOccurringCharacters: mostOccuringCharacter.map(({ name }) => name),
    };
  };
}
