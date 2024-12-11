import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CrawlWordOccurrency {
  @Field(() => String)
  word: string;

  @Field(() => Int)
  occurrencies: number;
}
