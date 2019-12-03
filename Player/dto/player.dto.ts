import {
    PowerScore,
    AcceptedOrPending,
    Personal,
    SportInfo,
    SchoolInfo,
    Address,
    Statistics
} from "./types/index";
import { ObjectType, Field } from "type-graphql";

@ObjectType()
export default class PlayerDto {
    @Field()
    id: string;

    @Field()
    email: string;

    @Field()
    thumbnail: string;

    @Field()
    user_type: string;

    @Field(() => [PowerScore])
    power_score: PowerScore[];

    @Field(() => AcceptedOrPending)
    spectators: AcceptedOrPending;

    @Field(() => AcceptedOrPending)
    teams: AcceptedOrPending;

    @Field()
    banner: string;

    @Field(() => [String])
    likes: string[];

    @Field(() => Personal)
    personal: Personal;

    @Field(() => SportInfo)
    sport_info: SportInfo;

    @Field(() => [String])
    favorites: string[];

    @Field(() => SchoolInfo)
    school_info: SchoolInfo;

    @Field(() => Address)
    address: Address;

    @Field(() => Statistics)
    statistics: Statistics;
}
