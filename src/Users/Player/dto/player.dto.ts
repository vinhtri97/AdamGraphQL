import {
    PowerScore,
    AcceptedOrPending,
    SportInfo,
    SchoolInfo,
    Statistics
} from "./types/index";
import { ObjectType, Field } from "type-graphql";
import UserDto from "../../User/dto/User.dto";
@ObjectType()
export default class PlayerDto extends UserDto {
    @Field(() => [PowerScore])
    power_score: PowerScore[];

    @Field(() => AcceptedOrPending)
    spectators: AcceptedOrPending;

    @Field(() => AcceptedOrPending)
    teams: AcceptedOrPending;

    @Field(() => [String])
    likes: string[];

    @Field(() => SportInfo)
    sport_info: SportInfo;

    @Field(() => [String])
    favorites: string[];

    @Field(() => SchoolInfo)
    school_info: SchoolInfo;

    @Field(() => Statistics)
    statistics: Statistics;
}
