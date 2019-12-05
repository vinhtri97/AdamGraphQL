import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class Extremity {
    @Field()
    wing_span: number;

    @Field()
    hand_size: number;

    @Field()
    shoe_size: number;
}
