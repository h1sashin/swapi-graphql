import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Human {
  @Field(() => String)
  birth_year: string;

  @Field(() => String)
  eye_color: string;

  @Field(() => String)
  gender: string;

  @Field(() => String)
  hair_color: string;

  @Field(() => String)
  height: string;

  @Field(() => String)
  homeworld: string;

  @Field(() => String)
  mass: string;

  @Field(() => String)
  name: string;

  @Field(() => String)
  skin_color: string;

  @Field(() => String)
  created: string;

  @Field(() => String)
  edited: string;

  films: string[];
  species: string[];
  starships: string[];
  url: string;
  vehicles: string[];
}
