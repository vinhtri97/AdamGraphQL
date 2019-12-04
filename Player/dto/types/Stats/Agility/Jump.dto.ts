import { StatsFields } from "./../StatsFields.dto";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class Jump {
    @Field(() => StatsFields)
    broad_jump: StatsFields;

    @Field(() => StatsFields)
    triple_jump: StatsFields;

    @Field(() => StatsFields)
    vertical_jump: StatsFields;

    @Field(() => StatsFields)
    one_step_vertical_jump: StatsFields;
}
