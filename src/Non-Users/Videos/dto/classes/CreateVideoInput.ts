/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArgsType, Field, InputType } from "type-graphql";
import { CreateEntityInput } from "../../../Generics/dto/classes/index";
import { CreateUploadedBy } from "./types/index";

@ArgsType()
@InputType("CreateVideoInput")
export class CreateVideoInput extends CreateEntityInput {
    @Field()
    url: string;

    @Field()
    type: string;

    @Field({ nullable: true })
    jersey_color: string;

    @Field({ nullable: true })
    jersey_number: string;

    @Field({ nullable: true })
    specific_type: string;

    @Field({ nullable: true })
    facility: string;

    @Field()
    date: string;

    @Field(() => [String], { nullable: true })
    teams: string[];

    @Field(() => [String], { nullable: true })
    likes: string[];

    @Field({ nullable: true })
    accepted: boolean;

    @Field(() => CreateUploadedBy)
    uploaded_by: CreateUploadedBy;
}
