import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Starship {
  @Field(() => String)
  name: string;

  @Field(() => String)
  model: string;

  @Field(() => String)
  manufacturer: string;

  @Field(() => String)
  cost_in_credits: string;

  @Field(() => String)
  length: string;

  @Field(() => String)
  max_atmosphering_speed: string;

  @Field(() => String)
  crew: string;

  @Field(() => String)
  passengers: string;

  @Field(() => String)
  cargo_capacity: string;

  @Field(() => String)
  consumables: string;

  @Field(() => String)
  hyperdrive_rating: string;

  @Field(() => String)
  MGLT: string;

  @Field(() => String)
  starship_class: string;

  @Field(() => String)
  created: string;

  @Field(() => String)
  edited: string;

  url: string;
  pilots: string[];
  films: string[];
}
