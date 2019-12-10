import { ObjectType, Field } from "type-graphql";
<<<<<<< Updated upstream:src/Non-Users/Chats/dto/Chat.dto.ts
import EntityDto from "../../Generics/dto/Entity.dto";
=======
import EntityDto from "../../Generic/dto/Entity.dto";
>>>>>>> Stashed changes:src/Non-Users/Chat/dto/Chat.dto.ts
import { ChatUser } from "./classes/types/index";

@ObjectType()
export default class ChatDto extends EntityDto {
    @Field()
    isPremade: boolean;

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
