import { CreatePageModel } from '@common/graphql/page.model';
import { ObjectType } from '@nestjs/graphql';
import { Film } from './film.model';

@ObjectType()
export class FilmsPage extends CreatePageModel(Film) {}
