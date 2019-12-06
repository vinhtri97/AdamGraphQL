import { SportInfo, SchoolInfo } from "../dto/types/index";
import { ArgsType, Field } from "type-graphql";
import CreateUserInput from "../../User/inputs/createUser.input";

@ArgsType()
export class CreatePlayerInput extends CreateUserInput {
    @Field(() => SportInfo)
    sport_info: SportInfo;

    @Field(() => SchoolInfo, { nullable: true })
    school_info: SchoolInfo;
}
