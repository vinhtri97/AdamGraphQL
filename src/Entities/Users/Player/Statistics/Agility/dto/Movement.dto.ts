import { Field, InputType, ObjectType } from 'type-graphql';

import { StatsFields } from '../../StatsFields.dto';

@ObjectType()
@InputType('MovementInput')
export class Movement {
    @Field(() => StatsFields)
    ten_yard_shuttle: StatsFields;

    @Field(() => StatsFields)
    twenty_yard_shuttle: StatsFields;

    @Field(() => StatsFields)
    three_cone_drill: StatsFields;

    @Field(() => StatsFields)
    t_test: StatsFields;

    @Field(() => StatsFields)
    compass_agility: StatsFields;

    @Field(() => StatsFields)
    box_drill: StatsFields;

    @Field(() => StatsFields)
    quadrant_jump: StatsFields;
}
