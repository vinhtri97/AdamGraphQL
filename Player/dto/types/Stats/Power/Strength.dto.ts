import { StatsFields } from "./../StatsFields.dto";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class Strength {
    @Field(() => StatsFields)
    bench_press_80: StatsFields;

    @Field(() => StatsFields)
    bench_press_weight: StatsFields;

    @Field(() => StatsFields)
    bench_press_PR: StatsFields;

    @Field(() => StatsFields)
    squat_80: StatsFields;

    @Field(() => StatsFields)
    squat_weight: StatsFields;

    @Field(() => StatsFields)
    squat_PR: StatsFields;

    @Field(() => StatsFields)
    deadlift_80: StatsFields;

    @Field(() => StatsFields)
    deadlift_weight: StatsFields;

    @Field(() => StatsFields)
    deadlift_press_PR: StatsFields;

    @Field(() => StatsFields)
    push_up: StatsFields;

    @Field(() => StatsFields)
    chin_up: StatsFields;

    @Field(() => StatsFields)
    sit_up: StatsFields;

    @Field(() => StatsFields)
    plank: StatsFields;

    @Field(() => StatsFields)
    grip: StatsFields;

    @Field(() => StatsFields)
    sit_and_reach: StatsFields;

    @Field(() => StatsFields)
    stork_balance: StatsFields;
}
