/* eslint-disable @typescript-eslint/no-explicit-any */
import { Field, InputType, ArgsType } from "type-graphql";
import { UpdateEntityInput } from "../../../Generic/dto/classes/index";

@ArgsType()
@InputType("UpdateFieldInput")
export class UpdateFieldInput extends UpdateEntityInput {
    @Field({ nullable: true })
    park: string;

    @Field({ nullable: true })
    highschool_compatible: boolean;
}
