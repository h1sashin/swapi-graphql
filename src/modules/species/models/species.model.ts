import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Species {
  @Field()
  name: string;

  @Field()
  classification: string;

  @Field()
  designation: string;

  @Field(() => String)
  average_height: string;

  @Field()
  skin_colors: string;

  @Field()
  hair_colors: string;

  @Field()
  eye_colors: string;

  @Field(() => String)
  average_lifespan: string;

  @Field()
  homeworld: string;

  @Field()
  language: string;

  @Field()
  created: string;

  @Field()
  edited: string;

  url: string;
  films: string[];
}
