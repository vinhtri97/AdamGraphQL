/* eslint-disable @typescript-eslint/no-explicit-any */
import { Field, InputType, ArgsType } from "type-graphql";
import { UpdateEntityInput } from "../../../Generics/dto/classes/index";
import { UploadedByInput } from "./types/index";

@ArgsType()
@InputType("UpdateVideoInput")
export class UpdateVideoInput extends UpdateEntityInput {
    @Field({ nullable: true })
    url: string;

    @Field({ nullable: true })
    type: string;

    @Field({ nullable: true })
    jersey_color: string;

    @Field({ nullable: true })
    jersey_number: string;

    @Field({ nullable: true })
    specific_type: string;

    @Field({ nullable: true })
    facility: string;

    @Field({ nullable: true })
    date: string;

    @Field(() => [String], { nullable: true })
    teams: string[];

    @Field(() => [String], { nullable: true })
    likes: string[];

    @Field({ nullable: true })
    accepted: boolean;

    @Field(() => UploadedByInput, { nullable: true })
    uploaded_by: UploadedByInput;
}
