import Player from "../schema/Player.schema";
import PlayerDto from "../dto/Player.dto";
import { getObjects } from "../../../Functions";
import CoachDto from "../../Coach/dto/Coach.dto";
export class PlayerQueryService {
    async getPlayers(): Promise<Array<PlayerDto>> {
        return await Player.find({}).lean();
    }

    async getFavoritesForPlayer(coachID: string): Promise<Array<CoachDto>> {
        return await getObjects(Player, coachID, "coaches", "favorites");
    }
}
