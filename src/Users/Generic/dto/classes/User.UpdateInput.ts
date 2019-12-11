import { AddressInput, PersonalInput } from "./types/index";
import { ArgsType, Field } from "type-graphql";

@ArgsType()
export class UpdateUserInput {
    @Field()
    id: string;

    @Field({ nullable: true })
    firebase_id: string;

    @Field({ nullable: true })
    email: string;

    @Field({ nullable: true })
    thumbnail: string;

    @Field(() => PersonalInput, { nullable: true })
    personal: PersonalInput;

    @Field(() => AddressInput, { nullable: true })
    address: AddressInput;
}
