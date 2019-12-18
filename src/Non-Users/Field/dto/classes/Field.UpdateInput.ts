/* eslint-disable @typescript-eslint/no-explicit-any */
import { Field, InputType, ArgsType } from "type-graphql";
import { UpdateEntityInput } from "../../../Generic/dto/classes/index";

@ArgsType()
@InputType("UpdateFieldInput")
export class UpdateFieldInput extends UpdateEntityInput {
    @Field({ nullable: true })
    park: string;

    @Field({ nullable: true })
    has_seating: boolean;

    @Field({ nullable: true })
    is_turf: boolean;

    @Field(() => [String], { nullable: true })
    pictures: string[];

    @Field({ nullable: true })
    electricity: boolean;

    @Field(() => [String], { nullable: true })
    sports: string[];

    @Field({ nullable: true })
    is_indoor: boolean;

    @Field({ nullable: true })
    size: boolean;

    @Field({ nullable: true })
    highschool_compatible: boolean;
}
