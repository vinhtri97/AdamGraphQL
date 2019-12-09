import { PlayerSportInfo, PlayerSchoolInfo } from "./types/index";
import { ArgsType, Field } from "type-graphql";
import { CreateUserInput } from "../../../Generics/dto/classes/index";

@ArgsType()
export class CreatePlayerInput extends CreateUserInput {
    @Field(() => PlayerSportInfo)
    sport_info: PlayerSportInfo;

    @Field(() => PlayerSchoolInfo, { nullable: true })
    school_info: PlayerSchoolInfo;
}
