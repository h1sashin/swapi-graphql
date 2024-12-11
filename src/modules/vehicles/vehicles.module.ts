import { forwardRef, Module } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { VehiclesResolver } from './vehicles.resolver';
import { FilmsModule } from '@module/films/films.module';
import { VehiclesLoader } from './vehicles.loader';

@Module({
  imports: [forwardRef(() => FilmsModule)],
  providers: [VehiclesResolver, VehiclesService, VehiclesLoader],
  exports: [VehiclesService, VehiclesLoader],
})
export class VehiclesModule {}
