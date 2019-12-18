/* eslint-disable @typescript-eslint/no-explicit-any */
import { ObjectType, Field } from "type-graphql";
import EntityDto from "../../Generic/dto/Entity.dto";
import { Address } from "../../../Users/Generic/dto/classes/types/index";

@ObjectType()
export default class ParkDto extends EntityDto {
    @Field(() => [String])
    fields: string[];

    @Field()
    open_time: string;

    @Field()
    close_time: string;

    @Field()
    website: string;

    @Field()
    park_owner: string;

    @Field()
    free_wifi: boolean;

    @Field(() => [String])
    pictures: string[];

    @Field(() => [String])
    sports: string[];

    @Field()
    concessions: boolean;

    @Field()
    ice_chest: boolean;

    @Field()
    smoking: boolean;

    @Field(() => Address)
    address: Address;
}
