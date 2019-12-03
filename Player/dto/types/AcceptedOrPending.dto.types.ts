import { ObjectType, Field } from "type-graphql";

@ObjectType()
export class AcceptedOrPending {
    @Field(() => [String])
    pending: string[];

    @Field(() => [String])
    accepted: string[];
}
