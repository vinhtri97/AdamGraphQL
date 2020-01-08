import { ArgsType, Field, InputType } from "type-graphql";
import { CreateEntityInput } from "../../../Generic/dto/classes/index";
import { ChatUser } from "./types/index";

@ArgsType()
@InputType("CreateChatInput")
export class CreateChatInput extends CreateEntityInput {
    @Field({ nullable: true })
    name: string;

    @Field(() => [ChatUser], { nullable: true })
    users: ChatUser[];

    @Field({ nullable: true })
    team_id: string;
}
