import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class PowerScore {
    @Field(() => String)
    value: string;

    @Field(() => Date)
    Date: Date;
}
