import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { Human } from './models/human.model';
import { lastValueFrom, map } from 'rxjs';
import { SWapiPage } from '@common/types';

@Injectable()
export class PeopleService {
  constructor(private readonly httpService: HttpService) {}

  getAllPeople(): Promise<Human[]> {
    const recursiveGetPeople = async (
      url: string,
      people: Human[] = [],
    ): Promise<Human[]> => {
      const response = await lastValueFrom(
        this.httpService.get<SWapiPage<Human>>(url),
      );
      people = people.concat(response.data.results);
      if (response.data.next)
        return recursiveGetPeople(response.data.next, people);
      return people;
    };
    return recursiveGetPeople('people');
  }
}
