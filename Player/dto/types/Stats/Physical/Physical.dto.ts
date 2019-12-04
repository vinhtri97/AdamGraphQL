import { Dominance } from "./Dominance.dto";
import { Extremity } from "./Extremity.dto";
import { Field, ObjectType } from "type-graphql";
import { BMI } from "./BMI.dto";

@ObjectType()
export class Physical {
    @Field(() => BMI)
    bmi: BMI;

    @Field(() => Extremity)
    extremity: Extremity;

    @Field(() => Dominance)
    dominance: Dominance;
}
