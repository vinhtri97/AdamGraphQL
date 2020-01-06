import Player from "../schema/Player.schema";
import PlayerDto from "../dto/Player.dto";
import { getObjects, getNestedTrueFalseObjects } from "../../../Functions";
import { GetTeamsDto } from "../dto/classes/index";
import CoachDto from "../../Coach/dto/Coach.dto";
export class PlayerQueryService {
    async getPlayers(): Promise<Array<PlayerDto>> {
        return await Player.find({}).lean();
    }

    async getFavoritesForPlayer(playerID: string): Promise<Array<CoachDto>> {
        return await getObjects(Player, playerID, "coaches", "favorites");
    }

    async getTeamsForPlayer(playerID: string): Promise<GetTeamsDto> {
        return await getNestedTrueFalseObjects(
            Player,
            playerID,
            "teams",
            "teams"
        );
    }
}
