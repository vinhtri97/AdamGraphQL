import { ObjectType, Field, InputType } from "type-graphql";

@ObjectType()
@InputType("AddressInput")
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
