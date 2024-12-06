import { ArgsType, Field, Int } from '@nestjs/graphql';

@ArgsType()
export class PageArgs {
  @Field(() => Int, { nullable: true, defaultValue: 1 })
  page: number;

  @Field(() => String, {
    nullable: true,
    description:
      'Search for entities that match the given string. All searches will use case-insensitive matching.',
  })
  search?: string;
}
