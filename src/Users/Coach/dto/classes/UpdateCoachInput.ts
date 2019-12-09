// import { CoachSportInfo, CoachSchoolInfo } from "../dto/types/index";
import { ArgsType, Field } from "type-graphql";
import { UpdateUserInput } from "../../../Generics/dto/classes/index";
@ArgsType()
export class UpdateCoachInput extends UpdateUserInput {
    @Field({ nullable: true })
    sport: string;

    @Field({ nullable: true })
    coach_type: string;

    @Field({ nullable: true })
    school_district?: string;

    @Field({ nullable: true })
    school?: string;

    @Field({ nullable: true })
    school_type?: string;
}
