import { ObjectType, Field } from "type-graphql";

@ObjectType()
export default class Team {
    @Field()
    name: string;

    @Field(() => String)
    info: string;

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
