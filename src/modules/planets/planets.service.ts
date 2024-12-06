import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { map } from 'rxjs';

@Injectable()
export class PlanetsService {
  constructor(private readonly httpService: HttpService) {}

  async getPlanetById(id: number) {
    return this.httpService.get(`/planets/${id}`).pipe(map((res) => res.data));
  }
}
