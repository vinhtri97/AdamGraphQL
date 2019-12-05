import { ObjectType, Field, InputType } from "type-graphql";

@ObjectType()
@InputType("AddressInput")
export class Address {
    @Field({ nullable: true })
    city: string;

    @Field({ nullable: true })
    state: string;

    @Field({ nullable: true })
    street: string;

    @Field({ nullable: true })
    zip: number;
}
