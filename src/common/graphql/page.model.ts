import { Type } from '@nestjs/common';
import { Field, ObjectType } from '@nestjs/graphql';
import { PageInfo } from './page-info.model';

export function CreatePageModel<T>(classRef: Type<T>) {
  abstract class PageModel {}

  ObjectType('Page')(PageModel);

  Field(() => PageInfo)(PageModel.prototype, 'pageInfo');
  Field(() => [classRef])(PageModel.prototype, 'results');

  Object.defineProperty(PageModel, 'name', {
    value: `${classRef.name}Page`,
  });

  return PageModel as Type<{ pageInfo: PageInfo; results: T[] }>;
}
