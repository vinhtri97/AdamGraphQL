import { Throw } from "./Throw.dto";
import { Strength } from "./Strength.dto";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class Power {
    @Field()
    power_score: number;

    @Field(() => Strength)
    strength: Strength;

    @Field(() => Throw)
    throw: Throw;
}
