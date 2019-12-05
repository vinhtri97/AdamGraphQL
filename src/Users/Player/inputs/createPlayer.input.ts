import { SportInfo, SchoolInfo } from "../dto/types/index";
import { ArgsType, Field } from "type-graphql";
import CreateUserInput from "../../User/inputs/createUser.input";
import { IsIn } from "class-validator";
@ArgsType()
export default class CreatePlayerInput extends CreateUserInput {
    @Field({ nullable: true })
    @IsIn(["Player"])
    user_type: string;

    @Field(() => SportInfo)
    sport_info: SportInfo;

    @Field(() => SchoolInfo, { nullable: true })
    school_info: SchoolInfo;
}
