import { Field, ObjectType } from 'type-graphql';

import { StatsFields } from '../../StatsFields.dto';

@ObjectType()
export class TennisDto {
    @Field(() => StatsFields)
    court_sprint_3quarters: StatsFields;

    @Field(() => StatsFields)
    laying_agility_drill: StatsFields;

    @Field(() => StatsFields)
    reactive_shuttle_run: StatsFields;

    @Field(() => StatsFields)
    server_velocity: StatsFields;

    @Field(() => StatsFields)
    five_yard_dash: StatsFields;

    @Field(() => StatsFields)
    return_ball_velocity: StatsFields;
}
