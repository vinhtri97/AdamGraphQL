import { ArgsType, Field } from "type-graphql";
import { CreateEntityInput } from "../../../Generic/dto/classes/index";

@ArgsType()
export class CreateTeamInput extends CreateEntityInput {
    @Field(() => String)
    coaches: string[];

    @Field(() => String, { nullable: true })
    chats?: string;

    @Field(() => [String], { nullable: true })
    tournaments?: string[];

    @Field(() => [String], { nullable: true })
    accepted_players?: string[];

    @Field(() => [String], { nullable: true })
    pending_players?: string[];
}
