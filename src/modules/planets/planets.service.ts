import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { AxiosError } from 'axios';
import { catchError, lastValueFrom, map, of } from 'rxjs';
import { Planet } from './models/planet.model';

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

  getPlanets(search?: string): Promise<Planet[]> {
    return lastValueFrom(
      this.httpService.get<Planet[]>('planets', { params: { search } }).pipe(
        map((res) => res.data),
        catchError((error: AxiosError) => {
          if (error.status === 404) return of([]);
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
