import { Module } from '@nestjs/common';
import { FilmsService } from './films.service';
import { FilmsResolver } from './films.resolver';
import { FilmsLoader } from './films.loader';

@Module({
  providers: [FilmsResolver, FilmsService, FilmsLoader],
  exports: [FilmsService, FilmsLoader],
})
export class FilmsModule {}
