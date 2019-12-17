import { CoachSportInfo, CoachSchoolInfo } from "./types/index";
import { ArgsType, Field } from "type-graphql";
import { CreateUserInput } from "../../../Generic/dto/classes/index";
@ArgsType()
export class CreateCoachInput extends CreateUserInput {
    @Field(() => CoachSportInfo)
    sport_info: CoachSportInfo;

    @Field(() => CoachSchoolInfo, { nullable: true })
    school_info: CoachSchoolInfo;
}
