import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { catchError, lastValueFrom, map, of } from 'rxjs';
import { Starship } from './models/starship.model';
import { AxiosError } from 'axios';

@Injectable()
export class StarshipsService {
  constructor(private readonly httpService: HttpService) {}

  getStarshipById(id: number): Promise<Starship | null> {
    return lastValueFrom(
      this.httpService.get<Starship>(`starships/${id}`).pipe(
        map((res) => res.data),
        catchError((error: AxiosError) => {
          if (error.status === 404) return of(null);
          throw error.message;
        }),
      ),
    );
  }

  getStarships(search?: string): Promise<Starship[]> {
    return lastValueFrom(
      this.httpService
        .get<Starship[]>('starships', { params: { search } })
        .pipe(
          map((res) => res.data),
          catchError((error: AxiosError) => {
            throw error.message;
          }),
        ),
    );
  }

  getStarshipByUrl(url: string): Promise<Starship | null> {
    return lastValueFrom(
      this.httpService.get<Starship>(url).pipe(
        map((res) => res.data),
        catchError((error: AxiosError) => {
          if (error.status === 404) return of(null);
          throw error.message;
        }),
      ),
    );
  }

  async getStarshipsByUrls(urls: string[]): Promise<Starship[]> {
    const result = await Promise.allSettled(
      urls.map((url) => this.getStarshipByUrl(url)),
    );
    return result
      .map((res) => (res.status === 'fulfilled' ? res.value : null))
      .filter(Boolean) as Starship[];
  }
}
