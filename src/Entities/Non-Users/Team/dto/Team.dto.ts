import { ObjectType, Field } from "type-graphql";
import EntityDto from "../../Generic/dto/Entity.dto";

@ObjectType()
export default class TeamDto extends EntityDto {
    @Field(() => String)
    coaches: string[];

    @Field(() => String)
    chats: string;

    @Field(() => String)
    fullPlayerChat: string;

    @Field(() => String)
    fullPlayerAndParentChat: string;

    @Field(() => [String])
    tournaments: string[];

    @Field(() => [String])
    accepted_players: string[];

    @Field(() => [String])
    pending_players: string[];
}
