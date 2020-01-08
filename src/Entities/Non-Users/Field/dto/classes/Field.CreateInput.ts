/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArgsType, Field, InputType } from "type-graphql";
import { CreateEntityInput } from "../../../Generic/dto/classes/index";

@ArgsType()
@InputType("CreateFieldInput")
export class CreateFieldInput extends CreateEntityInput {
    @Field()
    park: string;

    @Field()
    has_seating: boolean;

    @Field()
    is_turf: boolean;

    @Field(() => [String])
    pictures: string[];

    @Field()
    electricity: boolean;

    @Field(() => [String])
    sports: string[];

    @Field()
    is_indoor: boolean;

    @Field()
    size: boolean;

    @Field()
    highschool_compatible: boolean;
}
