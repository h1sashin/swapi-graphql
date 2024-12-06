import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType('Planet')
export class PlanetModel {
  @Field(() => Int)
  url: string;

  @Field(() => Date)
  created: Date;

  @Field(() => String)
  name: string;

  @Field(() => Int)
  diameter: number;

  @Field(() => String)
  gravity: string;

  @Field(() => String)
  climate: string;

  @Field(() => Int)
  orbital_period: number;

  @Field(() => Int)
  population: number;

  @Field(() => Int)
  rotation_period: number;

  @Field(() => Int)
  surface_water: number;

  @Field(() => String)
  terrain: string;
}
