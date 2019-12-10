import { ArgsType, Field, InputType } from "type-graphql";
import { CreateEntityInput } from "../../../Generics/dto/classes/index";
import { ChatUser } from "./types/index";

@ArgsType()
@InputType("CreateChatInput")
export class CreateChatInput extends CreateEntityInput {
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
