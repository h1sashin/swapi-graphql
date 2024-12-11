
# swapi-graphql Backend

This is the backend for the "swapi-graphql" project, built using NestJS, GraphQL, and Redis for caching. The backend provides a variety of GraphQL endpoints and includes support for caching, testing, and Docker.

## PNPM
This repository uses the [pnpm](https://pnpm.io/) package manager.

### PNPM Installation

To install pnpm, follow the instructions on the pnpm website: https://pnpm.io/installation

Once pnpm is installed, you can use it to install the project dependencies by running the following command in the project directory:

```bash
pnpm install
```

## Key Commands

### Build and Start

- **Build the project**:
  ```bash
  pnpm run build
  ```

- **Start the development server** (auto-reload):
  ```bash
  pnpm run start:dev
  ```

- **Start the production server**:
  ```bash
  pnpm run start:prod
  ```

- **Start in debug mode**:
  ```bash
  pnpm run start:debug
  ```

### Testing

- **Run unit tests**:
  ```bash
  pnpm run test
  ```

- **Run tests in watch mode**:
  ```bash
  pnpm run test:watch
  ```

- **Run tests with coverage**:
  ```bash
  pnpm run test:cov
  ```

- **Run end-to-end tests**:
  ```bash
  pnpm run test:e2e
  ```

### Docker

- **Start the application with Docker**:
  ```bash
  pnpm run start:docker
  ```

- **Stop the application with Docker**:
  ```bash
  pnpm run stop:docker
  ```

- **Cleanup docker after use**:
  ```bash
  pnpm run cleanup:docker
  ```

### Code Formatting and Linting

- **Format the code**:
  ```bash
  pnpm run format
  ```

- **Lint the code**:
  ```bash
  pnpm run lint
  ```

## Key Packages

- **NestJS**: A framework for building scalable Node.js applications.
- **GraphQL Yoga**: A fully-featured GraphQL server.
- **Redis**: Used for caching with `@envelop/response-cache-redis`.
- **Dataloader**: Efficient data loading to prevent N+1 query problems.
- **Jest**: A testing framework for unit and end-to-end testing.
- **Axios**: A promise-based HTTP client for making requests.
- **Prettier**: Code formatter to keep code clean and consistent.
- **ESLint**: Linter for identifying and fixing issues in the code.
- **Docker**: Containerized development and deployment.

## Setup

1. Install dependencies:
   ```bash
   pnpm install
   ```

2. Set up the environment variables in a `.env` file.
3. Start the development server:
   ```bash
   pnpm run start:dev
   ```

# GraphQL API Documentation

This API provides access to data related to various Star Wars entities such as films, planets, vehicles, starships, and species. The data is fetched via GraphQL queries.

## Types

### `PageInfo`
Contains information about the pagination of results.

- `page`: The current page.
- `perPage`: The number of items per page.
- `total`: Total number of items available.
- `totalPages`: Total number of pages.
- `hasNextPage`: Whether there is a next page.
- `hasPreviousPage`: Whether there is a previous page.

### `Film`
Represents a Star Wars film.

- `title`: The title of the film.
- `episode_id`: The episode number of the film.
- `opening_crawl`: The opening crawl text.
- `director`: The director of the film.
- `producer`: The producer of the film.
- `release_date`: The release date of the film.
- `created`: The date when the film was created.
- `edited`: The date when the film was last edited.
- `planets`: List of planets featured in the film.
- `vehicles`: List of vehicles featured in the film.
- `starships`: List of starships featured in the film.
- `species`: List of species featured in the film.

### `FilmsPage`
Contains a paginated list of films.

- `pageInfo`: Pagination information.
- `results`: List of films.

### `Planet`
Represents a planet in the Star Wars universe.

- `name`: The name of the planet.
- `rotation_period`: The planet's rotation period.
- `orbital_period`: The planet's orbital period.
- `diameter`: The diameter of the planet.
- `climate`: The climate of the planet.
- `gravity`: The gravity of the planet.
- `terrain`: The terrain of the planet.
- `surface_water`: The percentage of the planet's surface covered by water.
- `population`: The population of the planet.
- `created`: The date when the planet was created.
- `edited`: The date when the planet was last edited.
- `films`: List of films that feature this planet.

### `Vehicle`
Represents a vehicle in the Star Wars universe.

- `name`: The name of the vehicle.
- `model`: The model of the vehicle.
- `manufacturer`: The manufacturer of the vehicle.
- `cost_in_credits`: The cost of the vehicle in credits.
- `length`: The length of the vehicle.
- `max_atmosphering_speed`: The maximum atmospheric speed of the vehicle.
- `crew`: The number of crew members required to operate the vehicle.
- `passengers`: The number of passengers the vehicle can carry.
- `cargo_capacity`: The cargo capacity of the vehicle.
- `consumables`: The consumables used by the vehicle.
- `vehicle_class`: The class of the vehicle.
- `created`: The date when the vehicle was created.
- `edited`: The date when the vehicle was last edited.
- `films`: List of films that feature this vehicle.

### `Starship`
Represents a starship in the Star Wars universe.

- `name`: The name of the starship.
- `model`: The model of the starship.
- `manufacturer`: The manufacturer of the starship.
- `cost_in_credits`: The cost of the starship in credits.
- `length`: The length of the starship.
- `max_atmosphering_speed`: The maximum atmospheric speed of the starship.
- `crew`: The number of crew members required to operate the starship.
- `passengers`: The number of passengers the starship can carry.
- `cargo_capacity`: The cargo capacity of the starship.
- `consumables`: The consumables used by the starship.
- `hyperdrive_rating`: The hyperdrive rating of the starship.
- `MGLT`: The MGLT of the starship.
- `starship_class`: The class of the starship.
- `created`: The date when the starship was created.
- `edited`: The date when the starship was last edited.
- `films`: List of films that feature this starship.

### `Species`
Represents a species in the Star Wars universe.

- `name`: The name of the species.
- `classification`: The classification of the species.
- `designation`: The designation of the species.
- `average_height`: The average height of the species.
- `skin_colors`: The skin colors of the species.
- `hair_colors`: The hair colors of the species.
- `eye_colors`: The eye colors of the species.
- `average_lifespan`: The average lifespan of the species.
- `homeworld`: The homeworld of the species.
- `language`: The language spoken by the species.
- `created`: The date when the species was created.
- `edited`: The date when the species was last edited.
- `films`: List of films that feature this species.

### `CrawlWordOccurrency`
Represents a word and its occurrence count in the opening crawl of films.

- `word`: The word.
- `occurrencies`: The number of occurrences of the word.

### `CrawlScan`
Contains data about the most frequent words in opening crawls.

- `crawlWordOccurrencyList`: List of words and their occurrence counts.
- `mostOccurringCharacters`: List of the most occurring characters in the opening crawls.

### `PlanetsPage`
Contains a paginated list of planets.

- `pageInfo`: Pagination information.
- `results`: List of planets.

### `StarshipsPage`
Contains a paginated list of starships.

- `pageInfo`: Pagination information.
- `results`: List of starships.

### `VehiclesPage`
Contains a paginated list of vehicles.

- `pageInfo`: Pagination information.
- `results`: List of vehicles.

### `SpeciesPage`
Contains a paginated list of species.

- `pageInfo`: Pagination information.
- `results`: List of species.

## Queries

### `starships`
Fetch a paginated list of starships.

- Arguments:
  - `page`: The page number to retrieve. Default is `1`.
  - `search`: A string to search for starships. Case-insensitive.
  
- Returns: `StarshipsPage!`

### `getStarship`
Fetch a single starship by ID.

- Arguments:
  - `id`: The ID of the starship to fetch.

- Returns: `Starship!`

### `films`
Fetch a paginated list of films.

- Arguments:
  - `page`: The page number to retrieve. Default is `1`.
  - `search`: A string to search for films. Case-insensitive.

- Returns: `FilmsPage!`

### `getFilm`
Fetch a single film by ID.

- Arguments:
  - `id`: The ID of the film to fetch.

- Returns: `Film!`

### `crawlScan`
Fetch a crawl scan with word occurrences and the most occurring characters.

- Returns: `CrawlScan!`

### `planets`
Fetch a paginated list of planets.

- Arguments:
  - `page`: The page number to retrieve. Default is `1`.
  - `search`: A string to search for planets. Case-insensitive.

- Returns: `PlanetsPage!`

### `getPlanet`
Fetch a single planet by ID.

- Arguments:
  - `id`: The ID of the planet to fetch.

- Returns: `Planet!`

### `vehicles`
Fetch a paginated list of vehicles.

- Arguments:
  - `page`: The page number to retrieve. Default is `1`.
  - `search`: A string to search for vehicles. Case-insensitive.

- Returns: `VehiclesPage!`

### `getVehicle`
Fetch a single vehicle by ID.

- Arguments:
  - `id`: The ID of the vehicle to fetch.

- Returns: `Vehicle!`

### `species`
Fetch a paginated list of species.

- Arguments:
  - `page`: The page number to retrieve. Default is `1`.
  - `search`: A string to search for species. Case-insensitive.

- Returns: `SpeciesPage!`

### `getSpecies`
Fetch a single species by ID.

- Arguments:
  - `id`: The ID of the species to fetch.

- Returns: `Species!`
