// import { CoachSportInfo, CoachSchoolInfo } from "../dto/types/index";
import { ArgsType, Field } from "type-graphql";
import CreateUserInput from "../../User/inputs/createUser.input";
@ArgsType()
export default class CreateCoachInput extends CreateUserInput {
    @Field()
    sport: string;
    @Field()
    coach_type: string;
    @Field({ nullable: true })
    school_district?: string;
    @Field({ nullable: true })
    school?: string;
    @Field({ nullable: true })
    school_type?: string;
}
