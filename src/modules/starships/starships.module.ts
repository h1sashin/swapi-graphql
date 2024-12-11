import { forwardRef, Module } from '@nestjs/common';
import { StarshipsService } from './starships.service';
import { StarshipsResolver } from './starships.resolver';
import { StarshipsLoader } from './starships.loader';
import { FilmsModule } from '@module/films/films.module';

@Module({
  imports: [forwardRef(() => FilmsModule)],
  providers: [StarshipsResolver, StarshipsService, StarshipsLoader],
  exports: [StarshipsService, StarshipsLoader],
})
export class StarshipsModule {}
