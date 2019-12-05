import { ObjectType, Field, InputType } from "type-graphql";

@ObjectType()
@InputType("AcceptedOrPendingInput")
export class AcceptedOrPending {
    @Field(() => [String])
    pending: string[];

    @Field(() => [String])
    accepted: string[];
}
