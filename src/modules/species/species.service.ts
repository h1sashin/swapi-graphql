import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { catchError, lastValueFrom, map, of } from 'rxjs';
import { Species } from './models/Species.model';
import { AxiosError } from 'axios';

@Injectable()
export class SpeciesService {
  constructor(private readonly httpService: HttpService) {}

  getSpeciesById(id: number): Promise<Species | null> {
    return lastValueFrom(
      this.httpService.get<Species>(`species/${id}`).pipe(
        map((res) => res.data),
        catchError((error: AxiosError) => {
          if (error.status === 404) return of(null);
          throw error.message;
        }),
      ),
    );
  }

  getSpecies(search?: string): Promise<Species[]> {
    return lastValueFrom(
      this.httpService.get<Species[]>('species', { params: { search } }).pipe(
        map((res) => res.data),
        catchError((error: AxiosError) => {
          throw error.message;
        }),
      ),
    );
  }

  getSpeciesByUrl(url: string): Promise<Species | null> {
    return lastValueFrom(
      this.httpService.get<Species>(url).pipe(
        map((res) => res.data),
        catchError((error: AxiosError) => {
          if (error.status === 404) return of(null);
          throw error.message;
        }),
      ),
    );
  }

  async getSpeciesByUrls(urls: string[]): Promise<Species[]> {
    const result = await Promise.allSettled(
      urls.map((url) => this.getSpeciesByUrl(url)),
    );
    return result
      .map((res) => (res.status === 'fulfilled' ? res.value : null))
      .filter(Boolean) as Species[];
  }
}
