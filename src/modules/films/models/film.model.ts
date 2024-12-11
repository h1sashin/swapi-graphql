import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Film {
  @Field()
  title: string;

  @Field(() => Int)
  episode_id: number;

  @Field()
  opening_crawl: string;

  @Field()
  director: string;

  @Field()
  producer: string;

  @Field()
  release_date: string;

  @Field()
  created: string;

  @Field()
  edited: string;

  url: string;
  characters: string[];
  planets: string[];
  starships: string[];
  vehicles: string[];
  species: string[];
}
