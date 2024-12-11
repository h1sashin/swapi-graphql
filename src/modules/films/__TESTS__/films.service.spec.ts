import { Test, TestingModule } from '@nestjs/testing';
import { FilmsService } from '../films.service';
import { HttpService } from '@nestjs/axios';
import { PeopleService } from '../../people/people.service';
import { of, throwError } from 'rxjs';
import { AxiosError, AxiosResponse } from 'axios';
import { Film } from '../models/film.model';
import { Human } from '../../people/models/human.model';

jest.mock('@nestjs/axios');

describe('FilmsService', () => {
  let service: FilmsService;
  let httpService: HttpService;
  let peopleService: PeopleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FilmsService,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn(),
          },
        },
        {
          provide: PeopleService,
          useValue: {
            getAllPeople: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<FilmsService>(FilmsService);
    httpService = module.get<HttpService>(HttpService);
    peopleService = module.get<PeopleService>(PeopleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getFilmById', () => {
    it('should return a film by ID', async () => {
      const mockFilm = { id: 1, title: 'A New Hope' };
      jest
        .spyOn(httpService, 'get')
        .mockReturnValueOnce(of({ data: mockFilm } as AxiosResponse));

      const result = await service.getFilmById(1);
      expect(result).toEqual(mockFilm);
    });

    it('should return null if the film is not found', async () => {
      jest
        .spyOn(httpService, 'get')
        .mockReturnValue(throwError(() => ({ status: 404 })));

      const result = await service.getFilmById(999);
      expect(result).toBeNull();
    });
  });

  describe('getAllFilms', () => {
    it('should return all films recursively', async () => {
      const mockFilmsPage1 = {
        results: [{ id: 1, title: 'A New Hope' }],
        next: 'next-url',
      };
      const mockFilmsPage2 = {
        results: [{ id: 2, title: 'The Empire Strikes Back' }],
        next: null,
      };

      jest
        .spyOn(httpService, 'get')
        .mockImplementationOnce(() =>
          of({ data: mockFilmsPage1 } as AxiosResponse),
        )
        .mockImplementationOnce(() =>
          of({ data: mockFilmsPage2 } as AxiosResponse),
        );

      const result = await service.getAllFilms();
      expect(result).toEqual([
        mockFilmsPage1.results[0],
        mockFilmsPage2.results[0],
      ]);
    });
  });

  describe('getFilms', () => {
    it('should return films with pagination and search', async () => {
      const mockPage = {
        results: [{ id: 1, title: 'A New Hope' }],
        next: null,
      };

      jest
        .spyOn(httpService, 'get')
        .mockReturnValueOnce(of({ data: mockPage } as AxiosResponse));

      const result = await service.getFilms(1, 'hope');
      expect(result).toEqual(mockPage);
    });
  });

  describe('getFilmByUrl', () => {
    it('should return a film by URL', async () => {
      const mockFilm = { id: 1, title: 'A New Hope' };

      jest
        .spyOn(httpService, 'get')
        .mockReturnValueOnce(of({ data: mockFilm } as AxiosResponse));

      const result = await service.getFilmByUrl('some-url');
      expect(result).toEqual(mockFilm);
    });

    it('should return null if the film is not found by URL', async () => {
      jest
        .spyOn(httpService, 'get')
        .mockReturnValue(throwError(() => ({ status: 404 })));

      const result = await service.getFilmByUrl('invalid-url');
      expect(result).toBeNull();
    });
  });

  describe('scanCrawl', () => {
    it('should return crawl scan data', async () => {
      const mockFilms: Film[] = [
        {
          created: '2014-12-10T15:16:20.704000Z',
          episode_id: 1,
          director: 'Rian Johnson',
          edited: '2014-12-20T21:17:56.891000Z',
          planets: [],
          producer: 'Gary Kurtz',
          release_date: '2014-12-10T00:00:00Z',
          species: [],
          starships: [],
          url: 'https://swapi.dev/api/films/1/',
          vehicles: [],
          title: 'A New Hope',
          opening_crawl: 'It is a period of civil war...',
        },
      ];
      const mockPeople: Human[] = [
        {
          name: 'Luke Skywalker',
          birth_year: '19BBY',
          eye_color: 'blue',
          gender: 'male',
          hair_color: 'blond',
          height: '172',
          homeworld: 'https://swapi.dev/api/planets/1/',
          mass: '77',
          skin_color: 'fair',
          created: '2014-12-09T13:50:51.644000Z',
          edited: '2014-12-20T21:17:50.309000Z',
          films: ['https://swapi.dev/api/films/1/'],
          species: ['https://swapi.dev/api/species/1/'],
          starships: ['https://swapi.dev/api/starships/12/'],
          url: 'https://swapi.dev/api/people/1/',
          vehicles: ['https://swapi.dev/api/vehicles/14/'],
        },
      ];

      jest.spyOn(service, 'getAllFilms').mockResolvedValueOnce(mockFilms);
      jest
        .spyOn(peopleService, 'getAllPeople')
        .mockResolvedValueOnce(mockPeople);

      const result = await service.scanCrawl();

      expect(result).toEqual({
        crawlWordOccurrencyList: expect.any(Array),
        mostOccurringCharacters: expect.arrayContaining(['Luke Skywalker']),
      });
    });
  });
});
