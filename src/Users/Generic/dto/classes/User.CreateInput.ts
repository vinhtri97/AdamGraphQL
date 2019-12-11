import { Address, Personal } from "./types/index";
import { ArgsType, Field } from "type-graphql";

@ArgsType()
export class CreateUserInput {
    @Field()
    firebase_id: string;

    @Field()
    email: string;

    @Field({ nullable: true })
    thumbnail: string;

    @Field(() => Personal)
    personal: Personal;

    @Field(() => Address, { nullable: true })
    address: Address;
}
