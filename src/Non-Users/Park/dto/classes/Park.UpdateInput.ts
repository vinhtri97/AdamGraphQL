/* eslint-disable @typescript-eslint/no-explicit-any */
import { Field, InputType, ArgsType } from "type-graphql";
import { UpdateEntityInput } from "../../../Generic/dto/classes/index";
import { Address } from "../../../../Users/Generic/dto/classes/types/index";

@ArgsType()
@InputType("UpdateParkInput")
export class UpdateParkInput extends UpdateEntityInput {
    @Field({ nullable: true })
    open_time: string;

    @Field({ nullable: true })
    close_time: string;

    @Field(() => Address, { nullable: true })
    address: Address;
}
