import { ArgsType, Field } from "type-graphql";
import { UpdateUserInput } from "../../../Generic/dto/classes/index";
@ArgsType()
export class UpdateDirectorInput extends UpdateUserInput {
    @Field(() => [String], { nullable: true })
    tournaments: string[];

    @Field({ nullable: true })
    association: string;
}
