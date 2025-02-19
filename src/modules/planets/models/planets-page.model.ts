import { CreatePageModel } from '@common/graphql/page.model';
import { ObjectType } from '@nestjs/graphql';
import { Planet } from './planet.model';

@ObjectType()
export class PlanetsPage extends CreatePageModel(Planet) {}
