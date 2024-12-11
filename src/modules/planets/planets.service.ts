import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, lastValueFrom, map, of } from 'rxjs';
import { Planet } from './models/planet.model';
import { SWapiPage } from '@common/types';

@Injectable()
export class PlanetsService {
  constructor(private readonly httpService: HttpService) {}

  getPlanetById(id: number): Promise<Planet | null> {
    return lastValueFrom(
      this.httpService.get<Planet>(`planets/${id}`).pipe(
        map((res) => res.data),
        catchError((error: AxiosError) => {
          if (error.status === 404) return of(null);
          throw error.message;
        }),
      ),
    );
  }

  getPlanets(page: number = 1, search?: string): Promise<SWapiPage<Planet>> {
    return lastValueFrom(
      this.httpService
        .get<SWapiPage<Planet>>('planets', { params: { search, page } })
        .pipe(
          map((res) => res.data),
          catchError((error: AxiosError) => {
            throw error.message;
          }),
        ),
    );
  }

  getPlanetByUrl(url: string): Promise<Planet | null> {
    return lastValueFrom(
      this.httpService.get<Planet>(url).pipe(
        map((res) => res.data),
        catchError((error: AxiosError) => {
          if (error.status === 404) return of(null);
          throw error.message;
        }),
      ),
    );
  }

  async getPlanetsByUrls(urls: string[]): Promise<Planet[]> {
    const result = await Promise.allSettled(
      urls.map((url) => this.getPlanetByUrl(url)),
    );
    return result
      .map((res) => (res.status === 'fulfilled' ? res.value : null))
      .filter(Boolean) as Planet[];
  }
}
