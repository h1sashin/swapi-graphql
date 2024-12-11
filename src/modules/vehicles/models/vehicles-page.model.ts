import { CreatePageModel } from '@common/graphql/page.model';
import { ObjectType } from '@nestjs/graphql';
import { Vehicle } from './Vehicle.model';

@ObjectType()
export class VehiclesPage extends CreatePageModel(Vehicle) {}
