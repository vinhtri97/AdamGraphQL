import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class Address {
    @Field()
    city: string;

    @Field()
    state: string;

    @Field()
    street: string;

    @Field()
    zip: number;
}
