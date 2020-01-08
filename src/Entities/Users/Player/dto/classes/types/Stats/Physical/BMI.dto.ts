import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class BMI {
    @Field()
    height: string;

    @Field()
    weight: string;
}
