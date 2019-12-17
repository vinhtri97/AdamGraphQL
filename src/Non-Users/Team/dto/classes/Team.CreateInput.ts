import { ArgsType, Field } from "type-graphql";
import { CreateEntityInput } from "../../../Generic/dto/classes/index";

@ArgsType()
export class CreateTeamInput extends CreateEntityInput {
    @Field(() => String)
    coaches: string[];
}
