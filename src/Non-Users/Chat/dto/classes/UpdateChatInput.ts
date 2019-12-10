import { Field, InputType, ArgsType } from "type-graphql";
import { UpdateEntityInput } from "../../../Generic/dto/classes/index";
import { ChatUser } from "./types/index";

@ArgsType()
@InputType("UpdateChatInput")
export class UpdateChatInput extends UpdateEntityInput {
    @Field({ nullable: true })
    name: string;

    @Field(() => [ChatUser], { nullable: true })
    players: ChatUser[];

    @Field(() => [ChatUser], { nullable: true })
    coaches: ChatUser[];

    @Field(() => [ChatUser], { nullable: true })
    spectators: ChatUser[];

    @Field(() => [ChatUser], { nullable: true })
    directors: ChatUser[];

    @Field({ nullable: true })
    team_id: string;
}
