import { CreatePageModel } from '@common/graphql/page.model';
import { ObjectType } from '@nestjs/graphql';
import { Species } from './species.model';

@ObjectType()
export class SpeciesPage extends CreatePageModel(Species) {}
