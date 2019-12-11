/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArgsType, Field, InputType } from "type-graphql";
import { CreateEntityInput } from "../../../Generic/dto/classes/index";
import { Address } from "../../../../Users/Generic/dto/classes/types/index";

@ArgsType()
@InputType("CreateParkInput")
export class CreateParkInput extends CreateEntityInput {
    @Field(() => [String])
    fields: string[];

    @Field()
    open_time: string;

    @Field()
    close_time: string;

    @Field(() => Address)
    address: Address;
}
