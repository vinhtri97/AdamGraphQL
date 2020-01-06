import { ObjectType, Field } from "type-graphql";
import PlayerDto from "../../../../Users/Player/dto/Player.dto";
import SpectatorDto from "../../../../Users/Spectator/dto/Spectator.dto";
@ObjectType()
export class GetPlayersAndParentsDto {
    @Field(() => [PlayerDto])
    players: PlayerDto[];

    @Field(() => [SpectatorDto])
    parents: SpectatorDto[];
}
