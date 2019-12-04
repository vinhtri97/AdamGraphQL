import {
    Personal,
    // PowerScore,
    // AcceptedOrPending,
    SportInfo,
    SchoolInfo,
    Address
    // Statistics
} from "../dto/types/index";
import { ArgsType, Field } from "type-graphql";

@ArgsType()
export default class CreatePlayerInput {
    @Field()
    id: string;

    @Field()
    email: string;

    @Field({ nullable: true })
    thumbnail: string;

    @Field()
    user_type: string;

    @Field({ nullable: true })
    banner: string;

    @Field(() => Personal)
    personal: Personal;

    @Field(() => SportInfo)
    sport_info: SportInfo;

    @Field(() => SchoolInfo)
    school_info: SchoolInfo;

    @Field(() => Address)
    address: Address;
}
