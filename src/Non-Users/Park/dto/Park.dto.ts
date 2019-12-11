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

    @Field(() => Address)
    address: Address;
}
