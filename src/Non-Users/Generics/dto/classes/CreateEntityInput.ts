import { ArgsType, Field } from "type-graphql";

@ArgsType()
export class CreateEntityInput {
    @Field()
    name: string;

    @Field({ nullable: true })
    description: string;
}
