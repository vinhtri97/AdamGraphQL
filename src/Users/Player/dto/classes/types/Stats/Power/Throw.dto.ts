import { StatsFields } from "../StatsFields.dto";
import { Field, ObjectType } from "type-graphql";
@ObjectType()
export class Throw {
    @Field(() => StatsFields)
    overhead_throw: StatsFields;

    @Field(() => StatsFields)
    backwards_overhead_throw: StatsFields;

    @Field(() => StatsFields)
    behind_the_head_throw: StatsFields;
}
