import { StatsFields } from "../StatsFields.dto";
import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class Baseball {
    @Field(() => StatsFields)
    velocity: StatsFields;

    @Field(() => StatsFields)
    exit_speed: StatsFields;

    @Field(() => StatsFields)
    ball_fielding_100: StatsFields;

    @Field(() => StatsFields)
    longtoss: StatsFields;

    @Field(() => StatsFields)
    pop_time: StatsFields;

    @Field(() => StatsFields)
    home_to_second: StatsFields;
}
