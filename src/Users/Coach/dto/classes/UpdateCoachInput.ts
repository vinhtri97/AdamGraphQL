import { CoachSportInfoInput, CoachSchoolInfoInput } from "./types/index";
import { ArgsType, Field } from "type-graphql";
import { UpdateUserInput } from "../../../Generic/dto/classes/index";
@ArgsType()
export class UpdateCoachInput extends UpdateUserInput {
    @Field(() => [String], { nullable: true })
    teams: string[];

    @Field(() => CoachSportInfoInput, { nullable: true })
    sport_info: CoachSportInfoInput;

    @Field(() => [String], { nullable: true })
    favorites: string[];

    @Field(() => CoachSchoolInfoInput, { nullable: true })
    school_info: CoachSchoolInfoInput;
}
