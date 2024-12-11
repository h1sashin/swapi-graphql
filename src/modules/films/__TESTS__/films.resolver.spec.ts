import { Test, TestingModule } from '@nestjs/testing';
import { FilmsResolver } from '../films.resolver';
import { FilmsService } from '../films.service';
import { PlanetsLoader } from '@module/planets/planets.loader';
import { VehiclesLoader } from '@module/vehicles/vehicles.loader';
import { StarshipsLoader } from '@module/starships/starships.loader';
import { SpeciesLoader } from '@module/species/species.loader';
import { Film } from '../models/film.model';
import { swapiPageToPageInfo } from '@common/utils/swapiPageToPageInfo';

describe('FilmsResolver', () => {
  let resolver: FilmsResolver;
  let filmsService: FilmsService;
  let planetsLoader: PlanetsLoader;
  let vehiclesLoader: VehiclesLoader;
  let starshipsLoader: StarshipsLoader;
  let speciesLoader: SpeciesLoader;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FilmsResolver,
        {
          provide: FilmsService,
          useValue: {
            getFilms: jest.fn(),
            getFilmById: jest.fn(),
            scanCrawl: jest.fn(),
          },
        },
        {
          provide: PlanetsLoader,
          useValue: {
            batchPlanets: { loadMany: jest.fn() },
          },
        },
        {
          provide: VehiclesLoader,
          useValue: {
            batchVehicles: { loadMany: jest.fn() },
          },
        },
        {
          provide: StarshipsLoader,
          useValue: {
            batchStarships: { loadMany: jest.fn() },
          },
        },
        {
          provide: SpeciesLoader,
          useValue: {
            batchSpecies: { loadMany: jest.fn() },
          },
        },
      ],
    }).compile();

    resolver = module.get<FilmsResolver>(FilmsResolver);
    filmsService = module.get<FilmsService>(FilmsService);
    planetsLoader = module.get<PlanetsLoader>(PlanetsLoader);
    vehiclesLoader = module.get<VehiclesLoader>(VehiclesLoader);
    starshipsLoader = module.get<StarshipsLoader>(StarshipsLoader);
    speciesLoader = module.get<SpeciesLoader>(SpeciesLoader);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('films', () => {
    it('should return a FilmsPage', async () => {
      const mockFilmsPage = {
        results: [],
        count: 0,
        next: null,
        previous: null,
      };
      filmsService.getFilms = jest.fn().mockResolvedValue(mockFilmsPage);

      const result = await resolver.films({ page: 1, search: '' });

      expect(result).toEqual(swapiPageToPageInfo(mockFilmsPage, 1));
      expect(filmsService.getFilms).toHaveBeenCalledWith(1, '');
    });
  });

  describe('getFilm', () => {
    it('should return a film by id', async () => {
      const mockFilm = { id: 1, title: 'A New Hope' };
      filmsService.getFilmById = jest.fn().mockResolvedValue(mockFilm);

      const result = await resolver.getFilm(1);
      expect(result).toEqual(mockFilm);
      expect(filmsService.getFilmById).toHaveBeenCalledWith(1);
    });

    it('should return null if film not found', async () => {
      filmsService.getFilmById = jest.fn().mockResolvedValue(null);

      const result = await resolver.getFilm(1);
      expect(result).toBeNull();
    });
  });

  describe('crawlScan', () => {
    it('should return crawl scan result', async () => {
      const mockCrawlScan = { data: 'scan data' };
      filmsService.scanCrawl = jest.fn().mockResolvedValue(mockCrawlScan);

      const result = await resolver.crawlScan();
      expect(result).toEqual(mockCrawlScan);
      expect(filmsService.scanCrawl).toHaveBeenCalled();
    });
  });

  describe('planets', () => {
    it('should return a list of planets', async () => {
      const mockFilm: Film = {
        created: '2014-12-10T15:16:20.704000Z',
        episode_id: 1,
        director: 'Rian Johnson',
        edited: '2014-12-20T21:17:56.891000Z',
        planets: ['planet1', 'planet2'],
        producer: 'Gary Kurtz',
        release_date: '2014-12-10T00:00:00Z',
        species: [],
        starships: [],
        url: 'https://swapi.dev/api/films/1/',
        vehicles: [],
        title: 'A New Hope',
        opening_crawl: 'It is a period of civil war...',
      };
      const mockPlanets = [{ name: 'Tatooine' }, { name: 'Alderaan' }];
      planetsLoader.batchPlanets.loadMany = jest
        .fn()
        .mockResolvedValue(mockPlanets);

      const result = await resolver.planets(mockFilm);
      expect(result).toEqual(mockPlanets);
      expect(planetsLoader.batchPlanets.loadMany).toHaveBeenCalledWith(
        mockFilm.planets,
      );
    });
  });

  describe('vehicles', () => {
    it('should return a list of vehicles', async () => {
      const mockFilm: Film = {
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
        vehicles: ['vehicle1', 'vehicle2'],
        title: 'A New Hope',
        opening_crawl: 'It is a period of civil war...',
      };
      const mockVehicles = [{ name: 'Speeder' }, { name: 'AT-AT' }];
      vehiclesLoader.batchVehicles.loadMany = jest
        .fn()
        .mockResolvedValue(mockVehicles);

      const result = await resolver.vehicles(mockFilm);
      expect(result).toEqual(mockVehicles);
      expect(vehiclesLoader.batchVehicles.loadMany).toHaveBeenCalledWith(
        mockFilm.vehicles,
      );
    });
  });

  describe('starships', () => {
    it('should return a list of starships', async () => {
      const mockFilm: Film = {
        created: '2014-12-10T15:16:20.704000Z',
        episode_id: 1,
        director: 'Rian Johnson',
        edited: '2014-12-20T21:17:56.891000Z',
        planets: [],
        producer: 'Gary Kurtz',
        release_date: '2014-12-10T00:00:00Z',
        species: [],
        starships: ['starship1', 'starship2'],
        url: 'https://swapi.dev/api/films/1/',
        vehicles: [],
        title: 'A New Hope',
        opening_crawl: 'It is a period of civil war...',
      };
      const mockStarships = [{ name: 'Millennium Falcon' }, { name: 'X-Wing' }];
      starshipsLoader.batchStarships.loadMany = jest
        .fn()
        .mockResolvedValue(mockStarships);

      const result = await resolver.starships(mockFilm);
      expect(result).toEqual(mockStarships);
      expect(starshipsLoader.batchStarships.loadMany).toHaveBeenCalledWith(
        mockFilm.starships,
      );
    });
  });

  describe('species', () => {
    it('should return a list of species', async () => {
      const mockFilm: Film = {
        created: '2014-12-10T15:16:20.704000Z',
        episode_id: 1,
        director: 'Rian Johnson',
        edited: '2014-12-20T21:17:56.891000Z',
        planets: [],
        producer: 'Gary Kurtz',
        release_date: '2014-12-10T00:00:00Z',
        species: ['species1', 'species2'],
        starships: [],
        url: 'https://swapi.dev/api/films/1/',
        vehicles: [],
        title: 'A New Hope',
        opening_crawl: 'It is a period of civil war...',
      };
      const mockSpecies = [{ name: 'Human' }, { name: 'Wookiee' }];
      speciesLoader.batchSpecies.loadMany = jest
        .fn()
        .mockResolvedValue(mockSpecies);

      const result = await resolver.species(mockFilm);
      expect(result).toEqual(mockSpecies);
      expect(speciesLoader.batchSpecies.loadMany).toHaveBeenCalledWith(
        mockFilm.species,
      );
    });
  });
});
