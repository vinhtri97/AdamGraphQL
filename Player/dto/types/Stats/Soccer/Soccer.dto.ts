import { StatsFields } from "../StatsFields.dto";
import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class Soccer {
    @Field(() => StatsFields)
    arrowhead_agility: StatsFields;

    @Field(() => StatsFields)
    yo_yo_recovery: StatsFields;

    @Field(() => StatsFields)
    endurance_test_30_sec: StatsFields;

    @Field(() => StatsFields)
    compass_drill: StatsFields;
}
