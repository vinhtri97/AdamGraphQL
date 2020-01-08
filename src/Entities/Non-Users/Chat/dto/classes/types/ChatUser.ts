import { ObjectType, Field, InputType } from "type-graphql";

@ObjectType()
@InputType("ChatUserInput")
export class ChatUser {
    @Field()
    id: string;

    @Field()
    type: string;

    @Field()
    muted: boolean;

    @Field({ nullable: true })
    muted_type: string;
}
