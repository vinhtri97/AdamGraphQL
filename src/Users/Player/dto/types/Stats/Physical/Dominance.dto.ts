import { IsIn } from "class-validator";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class Dominance {
    @Field()
    @IsIn(["right", "left", "both"])
    hand_dominance: string;

    @Field()
    @IsIn(["right", "left", "both"])
    eye_dominance: string;

    @Field()
    @IsIn(["right", "left", "both"])
    leg_dominance: string;
}
