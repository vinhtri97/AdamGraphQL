import { ObjectType, Field } from "type-graphql";
import EntityDto from "../../Generic/dto/Entity.dto";
import { ChatUser } from "./classes/types/index";

@ObjectType()
export default class ChatDto extends EntityDto {
    @Field()
    isPremade: boolean;

    @Field(() => [ChatUser], { nullable: true })
    users: ChatUser[];

    @Field({ nullable: true })
    team_id: string;
}
