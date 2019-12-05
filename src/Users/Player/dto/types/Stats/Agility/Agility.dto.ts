import { Jump } from "./Jump.dto";
import { Speed } from "./Speed.dto";
import { Movement } from "./Movement.dto";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class Agility {
    @Field()
    jump_score: number;

    @Field()
    agility_score: number;

    @Field()
    speed_score: number;

    @Field()
    core_score: number;

    @Field(() => Movement)
    movement: Movement;

    @Field(() => Speed)
    speed: Speed;

    @Field(() => Jump)
    jump: Jump;
}
