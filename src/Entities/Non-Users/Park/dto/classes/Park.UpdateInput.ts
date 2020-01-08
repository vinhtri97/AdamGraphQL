/* eslint-disable @typescript-eslint/no-explicit-any */
import { Field, InputType, ArgsType } from "type-graphql";
import { UpdateEntityInput } from "../../../Generic/dto/classes/index";
import { Address } from "../../../../Users/Generic/dto/classes/types/index";

@ArgsType()
@InputType("UpdateParkInput")
export class UpdateParkInput extends UpdateEntityInput {
    @Field(() => [String], { nullable: true })
    fields: string[];

    @Field({ nullable: true })
    open_time: string;

    @Field({ nullable: true })
    close_time: string;

    @Field({ nullable: true })
    website: string;

    @Field({ nullable: true })
    park_owner: string;

    @Field({ nullable: true })
    free_wifi: boolean;

    @Field(() => [String], { nullable: true })
    pictures: string[];

    @Field(() => [String], { nullable: true })
    sports: string[];

    @Field({ nullable: true })
    concessions: boolean;

    @Field({ nullable: true })
    ice_chest: boolean;

    @Field({ nullable: true })
    smoking: boolean;

    @Field(() => Address, { nullable: true })
    address: Address;
}
