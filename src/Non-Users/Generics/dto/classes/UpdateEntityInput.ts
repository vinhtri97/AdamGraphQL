import { ArgsType, Field } from "type-graphql";

@ArgsType()
export class UpdateEntityInput {
    @Field()
    id: string;

    @Field({ nullable: true })
    name: string;

    @Field({ nullable: true })
    description: string;
}
