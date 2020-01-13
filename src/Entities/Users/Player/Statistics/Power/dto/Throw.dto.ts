import { Field, InputType, ObjectType } from 'type-graphql';

import { StatsFields } from '../../StatsFields.dto';

@ObjectType()
@InputType('ThrowInput')
export class Throw {
    @Field(() => StatsFields)
    overhead_throw: StatsFields;

    @Field(() => StatsFields)
    backwards_overhead_throw: StatsFields;

    @Field(() => StatsFields)
    behind_the_head_throw: StatsFields;
}
