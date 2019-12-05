import {
    Personal,
    CoachSportInfo,
    CoachSchoolInfo,
    Address
} from "../dto/types/index";
import { ArgsType, Field } from "type-graphql";
import { IsNotEmpty } from "class-validator";

@ArgsType()
export default class CreateCoachInput {
    @Field()
    id: string;

    @Field()
    @IsNotEmpty()
    email: string;

    @Field({ nullable: true })
    thumbnail: string;

    @Field()
    user_type: string;

    @Field(() => Personal)
    personal: Personal;

    @Field(() => CoachSportInfo)
    sport_info: CoachSportInfo;

    @Field(() => CoachSchoolInfo)
    school_info: CoachSchoolInfo;

    @Field(() => Address)
    address: Address;
}
