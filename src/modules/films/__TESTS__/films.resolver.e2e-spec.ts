import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { FilmsService } from '../films.service';
import { AppModule } from '../../../app.module';
import { PlanetsLoader } from '@module/planets/planets.loader';
import { INestApplication } from '@nestjs/common';

describe('FilmsResolver (e2e)', () => {
  let app: INestApplication;
  let filmsService = {
    getFilms: jest.fn().mockResolvedValue({ results: [], count: 0 }),
    getFilmById: jest.fn().mockResolvedValue(null),
    scanCrawl: jest.fn().mockResolvedValue({
      mostOccurringCharacters: ['Luke Skywalker'],
      crawlWordOccurrencyList: [{ word: 'star', occurrencies: 1 }],
    }),
  };
  let planetsLoader = {
    batchPlanets: {
      loadMany: jest
        .fn()
        .mockResolvedValue([{ name: 'Tatooine' }, { name: 'Alderaan' }]),
    },
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(FilmsService)
      .useValue(filmsService)
      .overrideProvider(PlanetsLoader)
      .useValue(planetsLoader)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should fetch films with pagination', async () => {
    const query = `
      query {
        films(page: 1, search: "star") {
          results {
            title
            director
          }
          pageInfo {
            total
          }
        }
      }
    `;

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({ query })
      .expect(200);

    expect(response.body.data.films.results).toEqual([]);
    expect(response.body.data.films.pageInfo.total).toBe(0);
    expect(filmsService.getFilms).toHaveBeenCalledWith(1, 'star');
  });

  it('should fetch a single film by ID', async () => {
    const query = `
      query {
        getFilm(id: 1) {
          title
          director
        }
      }
    `;

    filmsService.getFilmById.mockResolvedValueOnce({
      title: 'A New Hope',
      director: 'George Lucas',
    });

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({ query })
      .expect(200);

    expect(response.body.data.getFilm.title).toBe('A New Hope');
    expect(response.body.data.getFilm.director).toBe('George Lucas');
    expect(filmsService.getFilmById).toHaveBeenCalledWith(1);
  });

  it('should return null when film is not found', async () => {
    const query = `
      query {
        getFilm(id: 999) {
          title
        }
      }
    `;

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({ query })
      .expect(200);

    expect(response.body.data.getFilm).toBeNull();
    expect(filmsService.getFilmById).toHaveBeenCalledWith(999);
  });

  it('should scan crawl successfully', async () => {
    const query = `
      query {
        crawlScan {
          mostOccurringCharacters
          crawlWordOccurrencyList {
            word
            occurrencies
          }
        }
      }
    `;

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({ query })
      .expect(200);

    expect(response.body.data.crawlScan.mostOccurringCharacters).toBeTruthy();
    expect(response.body.data.crawlScan.crawlWordOccurrencyList).toEqual(
      expect.any(Array),
    );
    expect(filmsService.scanCrawl).toHaveBeenCalled();
  });

  it('should resolve planets field', async () => {
    const query = `
      query {
        getFilm(id: 1) {
          title
          planets {
            name
          }
        }
      }
    `;

    filmsService.getFilmById.mockResolvedValueOnce({
      title: 'A New Hope',
      planets: [1, 2],
    });

    const response = await request(app.getHttpServer())
      .post('/graphql')
      .send({ query })
      .expect(200);

    expect(response.body.data.getFilm.planets).toEqual([
      { name: 'Tatooine' },
      { name: 'Alderaan' },
    ]);
  });
});
