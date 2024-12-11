import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Vehicle {
  @Field()
  name: string;

  @Field()
  model: string;

  @Field()
  manufacturer: string;

  @Field(() => String)
  cost_in_credits: string;

  @Field(() => String)
  length: string;

  @Field(() => String)
  max_atmosphering_speed: string;

  @Field()
  crew: string;

  @Field()
  passengers: string;

  @Field(() => String)
  cargo_capacity: string;

  @Field()
  consumables: string;

  @Field()
  vehicle_class: string;

  @Field()
  created: string;

  @Field()
  edited: string;

  url: string;
  films: string[];
  pilots: string[];
}
