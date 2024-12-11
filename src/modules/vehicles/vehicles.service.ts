import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { catchError, lastValueFrom, map, of } from 'rxjs';
import { Vehicle } from './models/Vehicle.model';
import { AxiosError } from 'axios';
import { SWapiPage } from '@common/types';

@Injectable()
export class VehiclesService {
  constructor(private readonly httpService: HttpService) {}

  getVehicleById(id: number): Promise<Vehicle | null> {
    return lastValueFrom(
      this.httpService.get<Vehicle>(`vehicles/${id}`).pipe(
        map((res) => res.data),
        catchError((error: AxiosError) => {
          if (error.status === 404) return of(null);
          throw error.message;
        }),
      ),
    );
  }

  getStarships(page: number = 1, search?: string): Promise<SWapiPage<Vehicle>> {
    return lastValueFrom(
      this.httpService
        .get<SWapiPage<Vehicle>>('vehicles', { params: { search, page } })
        .pipe(
          map((res) => res.data),
          catchError((error: AxiosError) => {
            throw error.message;
          }),
        ),
    );
  }

  getVehicleByUrl(url: string): Promise<Vehicle | null> {
    return lastValueFrom(
      this.httpService.get<Vehicle>(url).pipe(
        map((res) => res.data),
        catchError((error: AxiosError) => {
          throw error.message;
        }),
      ),
    );
  }

  async getVehiclesByUrls(urls: string[]): Promise<Vehicle[]> {
    const result = await Promise.allSettled(
      urls.map((url) => this.getVehicleByUrl(url)),
    );
    return result
      .map((res) => (res.status === 'fulfilled' ? res.value : null))
      .filter(Boolean) as Vehicle[];
  }
}
