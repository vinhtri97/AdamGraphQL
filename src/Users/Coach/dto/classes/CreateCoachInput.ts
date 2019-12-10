import { CoachSportInfo, CoachSchoolInfo } from "./types/index";
import { ArgsType, Field } from "type-graphql";
import { CreateUserInput } from "../../../Generics/dto/classes/index";
@ArgsType()
export class CreateCoachInput extends CreateUserInput {
    @Field(() => [String])
    teams: string[];

    @Field(() => CoachSportInfo)
    sport_info: CoachSportInfo;

    @Field(() => [String])
    favorites: string[];

    @Field(() => CoachSchoolInfo)
    school_info: CoachSchoolInfo;
}
