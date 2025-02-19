import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Planet {
  @Field(() => String)
  name: string;

  @Field(() => String)
  rotation_period: string;

  @Field(() => String)
  orbital_period: string;

  @Field(() => String)
  diameter: string;

  @Field(() => String)
  climate: string;

  @Field(() => String)
  gravity: string;

  @Field(() => String)
  terrain: string;

  @Field(() => String)
  surface_water: string;

  @Field(() => String)
  population: string;

  @Field(() => String)
  created: string;

  @Field(() => String)
  edited: string;

  url: string;
  films: string[];
}
