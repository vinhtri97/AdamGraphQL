/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArgsType, Field, InputType } from "type-graphql";
import { CreateEntityInput } from "../../../Generic/dto/classes/index";

@ArgsType()
@InputType("CreateFieldInput")
export class CreateFieldInput extends CreateEntityInput {
    @Field()
    park: string;

    @Field()
    highschool_compatible: boolean;
}
