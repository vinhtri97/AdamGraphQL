import { ObjectType, Field } from "type-graphql";
<<<<<<< Updated upstream:src/Non-Users/Teams/dto/Team.dto.ts
import EntityDto from "./../../Generics/dto/Entity.dto";
=======
import EntityDto from "../../Generic/dto/Entity.dto";
>>>>>>> Stashed changes:src/Non-Users/Team/dto/Team.dto.ts

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
