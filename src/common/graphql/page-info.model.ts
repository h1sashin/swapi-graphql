import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType('PageInfo')
export class PageInfoModel {
  @Field(() => Int)
  page: number;

  @Field(() => Int)
  perPage: number;

  @Field(() => Int)
  total: number;

  @Field(() => Int)
  totalPages: number;

  @Field(() => Boolean)
  hasNextPage: boolean;

  @Field(() => Boolean)
  hasPreviousPage: boolean;
}
