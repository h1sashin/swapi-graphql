import { Inject, Injectable, Scope } from '@nestjs/common';
import { CONTEXT } from '@nestjs/graphql';
import DataLoader from 'dataloader';
import { Vehicle } from './models/Vehicle.model';
import { VehiclesService } from './vehicles.service';

@Injectable({ scope: Scope.REQUEST })
export class VehiclesLoader {
  constructor(
    @Inject(CONTEXT) private readonly context: any,
    private readonly vehiclesServicee: VehiclesService,
  ) {
    this.context.loaders.set(VehiclesLoader.name, this);
  }

  batchVehicles = new DataLoader<string, Vehicle>(async (keys) => {
    const vehicleUrls = Array.from(new Set(keys));
    const vehicles = await this.vehiclesServicee.getVehiclesByUrls(vehicleUrls);
    const map = new Map<string, Vehicle>(
      vehicles.map((vehicle) => [vehicle.url, vehicle]),
    );
    return keys.map((key) => map.get(key)!);
  });
}
