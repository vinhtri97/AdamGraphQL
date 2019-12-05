import {
    Personal,
    CoachSportInfo,
    CoachSchoolInfo,
    Address
} from "./types/index";
import { ObjectType, Field } from "type-graphql";

@ObjectType()
export default class CoachDto {
    @Field()
    id: string;

    @Field()
    email: string;

    @Field()
    thumbnail: string;

    @Field()
    user_type: string;

    @Field(() => [String])
    teams: string[];

    @Field()
    banner: string;

    @Field(() => Personal)
    personal: Personal;

    @Field(() => CoachSportInfo)
    sport_info: CoachSportInfo;

    @Field(() => [String])
    favorites: string[];

    @Field(() => CoachSchoolInfo)
    school_info: CoachSchoolInfo;

    @Field(() => Address)
    address: Address;
}
