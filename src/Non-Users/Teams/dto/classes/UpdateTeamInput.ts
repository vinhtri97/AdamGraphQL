import { ArgsType, Field } from "type-graphql";
import { UpdateEntityInput } from "./../../../Generics/dto/classes/index";

@ArgsType()
export class UpdateTeamInput extends UpdateEntityInput {
    @Field(() => String, { nullable: true })
    coaches?: string[];

    @Field(() => String, { nullable: true })
    chats?: string;

    @Field(() => [String], { nullable: true })
    tournaments?: string[];

    @Field(() => [String], { nullable: true })
    accepted_players?: string[];

    @Field(() => [String], { nullable: true })
    pending_players?: string[];
}
