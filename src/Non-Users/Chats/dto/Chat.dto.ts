import { ObjectType, Field } from "type-graphql";
import EntityDto from "../../Generics/dto/Entity.dto";
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
