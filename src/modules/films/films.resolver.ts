import { Resolver } from '@nestjs/graphql';
import { FilmsService } from './films.service';

@Resolver()
export class FilmsResolver {
  constructor(private readonly filmsService: FilmsService) {}
}
