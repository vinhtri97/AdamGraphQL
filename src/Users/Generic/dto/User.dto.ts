import { ObjectType, Field } from "type-graphql";
import { Address, Personal } from "./classes/types/index";

@ObjectType()
export default class UserDto {
    @Field()
    firebase_id: string;

    @Field()
    email: string;

    @Field()
    thumbnail: string;

    @Field()
    user_type: string;

    @Field({ nullable: true })
    banner: string;

    @Field(() => [String])
    tokens: string[];

    @Field(() => Personal)
    personal: Personal;

    @Field(() => Address, { nullable: true })
    address: Address;
}
