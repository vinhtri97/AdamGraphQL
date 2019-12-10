import { ArgsType, Field } from "type-graphql";
import { CreateUserInput } from "../../../Generic/dto/classes/index";
@ArgsType()
export class CreateDirectorInput extends CreateUserInput {
    @Field(() => [String], { nullable: true })
    tournaments: string[];

    @Field({ nullable: true })
    association: string;
}
