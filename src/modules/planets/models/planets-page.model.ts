import { CreatePageModel } from '@common/graphql/page.model';
import { ObjectType } from '@nestjs/graphql';
import { Planet } from './planet.model';

@ObjectType('PlanetsPage')
export class PlanetsPageModel extends CreatePageModel(Planet) {}
