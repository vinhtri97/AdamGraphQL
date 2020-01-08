import { StatsFields } from "../StatsFields.dto";
import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class Basketball {
    @Field(() => StatsFields)
    quarter_court_sprint: StatsFields;

    @Field(() => StatsFields)
    laying_agility_drill: StatsFields;

    @Field(() => StatsFields)
    reactive_shuttle_run: StatsFields;

    @Field(() => StatsFields)
    full_court_dribbling: StatsFields;

    @Field(() => StatsFields)
    full_court_2_ball_dribbling: StatsFields;

    @Field(() => StatsFields)
    freethrow: StatsFields;

    @Field(() => StatsFields)
    three_pointer: StatsFields;

    @Field(() => StatsFields)
    five_yard_dash: StatsFields;
}
