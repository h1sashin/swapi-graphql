import { Injectable } from '@nestjs/common';
import { Film } from './models/film.model';
import { HttpService } from '@nestjs/axios';
import { catchError, lastValueFrom, map, of } from 'rxjs';
import { AxiosError } from 'axios';

@Injectable()
export class FilmsService {
  constructor(private readonly httpService: HttpService) {}

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

  getFilms(search?: string): Promise<Film[]> {
    return lastValueFrom(
      this.httpService.get<Film[]>('films', { params: { search } }).pipe(
        map((res) => res.data),
        catchError((error: AxiosError) => {
          if (error.status === 404) return of([]);
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
}
