import { CoachSchoolInfo } from "./classes/types/index";
import { ObjectType, Field, ArgsType } from "type-graphql";
import UserDto from "../../Generics/dto/User.dto";

@ObjectType()
@ArgsType()
export default class CoachDto extends UserDto {
    @Field(() => [String])
    teams: string[];

    // @Field(() => CoachSportInfo)
    // sport_info: CoachSportInfo;

    @Field(() => [String])
    favorites: string[];

    @Field(() => CoachSchoolInfo)
    school_info: CoachSchoolInfo;
}
