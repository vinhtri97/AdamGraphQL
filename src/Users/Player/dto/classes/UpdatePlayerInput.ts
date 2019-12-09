import { PlayerSchoolInfoInput, PlayerSportInfoInput } from "./types/index";
import { ArgsType, Field } from "type-graphql";
import { UpdateUserInput } from "../../../Generics/dto/classes/index";

@ArgsType()
export class UpdatePlayerInput extends UpdateUserInput {
    @Field(() => PlayerSportInfoInput, { nullable: true })
    sport_info?: PlayerSportInfoInput;

    @Field(() => PlayerSchoolInfoInput, { nullable: true })
    school_info?: PlayerSchoolInfoInput;
}
