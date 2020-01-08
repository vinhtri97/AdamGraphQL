import { Field, InputType, ArgsType } from "type-graphql";
import { UpdateEntityInput } from "../../../Generic/dto/classes/index";
import { ChatUser } from "./types/index";

@ArgsType()
@InputType("UpdateChatInput")
export class UpdateChatInput extends UpdateEntityInput {
    @Field({ nullable: true })
    name: string;

    @Field(() => [ChatUser], { nullable: true })
    users: ChatUser[];

    @Field({ nullable: true })
    team_id: string;
}
