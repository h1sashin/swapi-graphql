import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { catchError, lastValueFrom, map, of } from 'rxjs';
import { Vehicle } from './models/Vehicle.model';
import { AxiosError } from 'axios';

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

  getVehicles(search?: string): Promise<Vehicle[]> {
    return lastValueFrom(
      this.httpService.get<Vehicle[]>('vehicles', { params: { search } }).pipe(
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
          if (error.status === 404) return of(null);
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
