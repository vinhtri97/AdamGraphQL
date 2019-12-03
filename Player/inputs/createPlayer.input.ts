import { ArgsType, Field } from "type-graphql";

@ArgsType()
export default class CreatePlayerInput {
    @Field(() => String)
    id: string;

    @Field(() => String)
    name: string;

    @Field()
    email: string;

    @Field()
    dob: string;
}
