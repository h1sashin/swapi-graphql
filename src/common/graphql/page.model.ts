import { Type } from '@nestjs/common';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { PageInfoModel } from './page-info.model';

export function CreatePageModel<T>(classRef: Type<T>) {
  abstract class PageModel {}

  ObjectType('Page')(PageModel);

  Field(() => PageInfoModel)(PageModel.prototype, 'pageInfo');
  Field(() => [classRef])(PageModel.prototype, 'items');

  const modelName = classRef.name.replace(/^(.*)Model$/, '$1');

  Object.defineProperty(PageModel, 'name', {
    value: `${modelName}Page`,
  });

  return PageModel as Type<{ pageInfo: PageInfoModel; items: T[] }>;
}
