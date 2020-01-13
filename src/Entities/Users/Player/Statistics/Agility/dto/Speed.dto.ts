import { Field, InputType, ObjectType } from 'type-graphql';

import { StatsFields } from '../../StatsFields.dto';

@ObjectType()
@InputType('SpeedInput')
export class Speed {
    @Field(() => StatsFields)
    ten_yard_dash: StatsFields;

    @Field(() => StatsFields)
    twenty_yard_dash: StatsFields;

    @Field(() => StatsFields)
    thirty_yard_dash: StatsFields;

    @Field(() => StatsFields)
    forty_yard_dash: StatsFields;

    @Field(() => StatsFields)
    fifty_yard_dash: StatsFields;

    @Field(() => StatsFields)
    sixty_yard_dash: StatsFields;

    @Field(() => StatsFields)
    ladder_drill: StatsFields;
}
