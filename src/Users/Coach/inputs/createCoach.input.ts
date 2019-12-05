import { CoachSportInfo, CoachSchoolInfo } from "../dto/types/index";
import { ArgsType, Field } from "type-graphql";
import CreateUserInput from "../../User/../User/inputs/createUser.input";
@ArgsType()
export default class CreateCoachInput extends CreateUserInput {
    @Field(() => CoachSportInfo)
    sport_info: CoachSportInfo;

    @Field(() => CoachSchoolInfo)
    school_info: CoachSchoolInfo;
}
