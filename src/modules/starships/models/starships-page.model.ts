import { CreatePageModel } from '@common/graphql/page.model';
import { ObjectType } from '@nestjs/graphql';
import { Starship } from './starship.model';

@ObjectType()
export class StarshipsPage extends CreatePageModel(Starship) {}
