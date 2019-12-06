import { SchoolInfo } from "../dto/types/index";
import { ArgsType, Field, ObjectType, InputType } from "type-graphql";
import { Personal, Address } from "../../User/dto/types/index";
// import CreateUserInput from "../../User/inputs/createUser.input";
import { IsIn } from "class-validator";

@ObjectType()
@InputType("PatchSportInfoInput")
class PatchSportInfo {
    @Field({ nullable: true })
    position?: string;

    @Field({ nullable: true })
    secondary_position?: string;

    @Field({ nullable: true })
    throwing?: string;

    @Field({ nullable: true })
    batting?: string;

    @Field({ nullable: true })
    sport?: string;

    @Field({ nullable: true })
    committed?: string;

    @Field({ nullable: true })
    committed_date?: string;
}

@ArgsType()
export class PatchPlayerInput {
    @Field()
    id: string;

    @Field({ nullable: true })
    email?: string;

    @Field({ nullable: true })
    thumbnail?: string;

    @Field(() => Personal, { nullable: true })
    personal?: string;

    @Field(() => Address, { nullable: true })
    address?: string;

    @Field({ nullable: true })
    @IsIn(["Player"])
    user_type?: string;

    @Field(() => PatchSportInfo, { nullable: true })
    sport_info?: PatchSportInfo;

    @Field(() => SchoolInfo, { nullable: true })
    school_info?: SchoolInfo;
}
