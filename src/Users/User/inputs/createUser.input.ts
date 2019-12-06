import { Address, Personal } from "../dto/types/index";
import { ArgsType, Field } from "type-graphql";
import { IsIn } from "class-validator";
@ArgsType()
export default class CreateUserInput {
    @Field()
    firebase_id: string;

    @Field()
    email: string;

    @Field({ nullable: true })
    thumbnail: string;

    @Field()
    @IsIn(["Player", "Coach", "Spectator", "Director"])
    user_type: string;

    @Field(() => Personal)
    personal: Personal;

    @Field(() => Address, { nullable: true })
    address: Address;
}
