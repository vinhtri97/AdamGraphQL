import { ObjectType, Field } from "type-graphql";
import { Address, Personal } from "./types/index";

@ObjectType()
export default class UserDto {
    @Field()
    id: string;

    @Field()
    email: string;

    @Field()
    thumbnail: string;

    @Field()
    user_type: string;

    @Field()
    banner: string;

    @Field(() => [String])
    tokens: string[];

    @Field(() => Personal)
    personal: Personal;

    @Field(() => Address, { nullable: true })
    address: Address;
}