import { Field, ObjectType } from 'type-graphql';

import { StatsFields } from '../../StatsFields.dto';

@ObjectType()
export class BaseballDto {
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
