import { ArgsType, Field } from "type-graphql";

@ArgsType()
export default class CreatePlayerInput {
    @Field(() => String)
    name: string;

    @Field()
    email: string;

    @Field()
    dob: number;
}
