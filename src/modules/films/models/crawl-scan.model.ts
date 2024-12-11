import { Field, ObjectType } from '@nestjs/graphql';
import { CrawlWordOccurrency } from './crawl-word-occurency.model';

@ObjectType()
export class CrawlScan {
  @Field(() => [CrawlWordOccurrency])
  crawlWordOccurrencyList: CrawlWordOccurrency[];

  @Field(() => [String])
  mostOccurringCharacters: string[];
}
