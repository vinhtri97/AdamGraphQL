import { ArgsType, Field } from "type-graphql";

@ArgsType()
export default class CreateTeamInput {
    @Field()
    sport_info: string;

    @Field()
    school_info: string;
}
