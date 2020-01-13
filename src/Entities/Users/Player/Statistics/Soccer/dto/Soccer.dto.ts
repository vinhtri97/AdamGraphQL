import { Field, ObjectType } from 'type-graphql';

import { StatsFields } from '../../StatsFields.dto';

@ObjectType()
export class SoccerDto {
    @Field(() => StatsFields)
    arrowhead_agility: StatsFields;

    @Field(() => StatsFields)
    yo_yo_recovery: StatsFields;

    @Field(() => StatsFields)
    endurance_test_30_sec: StatsFields;

    @Field(() => StatsFields)
    compass_drill: StatsFields;
}
