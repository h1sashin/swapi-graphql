import { Resolver } from '@nestjs/graphql';
import { StarshipsService } from './starships.service';

@Resolver()
export class StarshipsResolver {
  constructor(private readonly starshipsService: StarshipsService) {}
}
