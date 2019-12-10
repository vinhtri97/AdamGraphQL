/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArgsType, Field, InputType } from "type-graphql";
import { CreateEntityInput } from "../../../Generic/dto/classes/index";
// import { BugUser } from "./types/index";

@ArgsType()
@InputType("CreateBugInput")
export class CreateBugInput extends CreateEntityInput {
    @Field()
    message: string;

    @Field()
    date: string;

    @Field()
    category: string;

    @Field()
    email: string;

    @Field()
    first_name: string;

    @Field()
    last_name: string;
}
