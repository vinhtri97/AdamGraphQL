import {
    PowerScore,
    PlayerSportInfo,
    PlayerSchoolInfo,
    Statistics
} from "./classes/types/index";
import { ObjectType, Field } from "type-graphql";
import UserDto from "../../Generic/dto/User.dto";
@ObjectType()
export default class PlayerDto extends UserDto {
    @Field(() => [PowerScore])
    power_score: PowerScore[];

    @Field(() => [String])
    pending_spectators: string[];

    @Field(() => [String])
    accepted_spectators: string[];

    @Field(() => [String])
    accepted_teams: string[];

    @Field(() => [String])
    pending_teams: string[];

    @Field(() => [String])
    likes: string[];

    @Field(() => PlayerSportInfo)
    sport_info: PlayerSportInfo;

    @Field(() => [String])
    favorites: string[];

    @Field(() => PlayerSchoolInfo)
    school_info: PlayerSchoolInfo;

    @Field(() => Statistics)
    statistics: Statistics;
}
