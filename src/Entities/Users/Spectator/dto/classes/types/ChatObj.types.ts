import { ObjectType, Field, InputType } from "type-graphql";

@ObjectType()
@InputType("ChatObjInput")
export class ChatObj {
    @Field()
    chat_id: string;

    @Field()
    team_id: string;
}
