import { StatsFields } from "../StatsFields.dto";
import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class Volleyball {
    @Field(() => StatsFields)
    court_sprint_3quarters: StatsFields;

    @Field(() => StatsFields)
    laying_agility_drill: StatsFields;

    @Field(() => StatsFields)
    reactive_shuttle_run: StatsFields;

    @Field(() => StatsFields)
    serve_velocity: StatsFields;

    @Field(() => StatsFields)
    five_yard_dash: StatsFields;

    @Field(() => StatsFields)
    wall_velocity: StatsFields;

    @Field(() => StatsFields)
    wall_spike: StatsFields;

    @Field(() => StatsFields)
    forearm_pass_test: StatsFields;
}
