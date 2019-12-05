import Player from "../schema/player.schema";
import PlayerDto from "../dto/player.dto";
import { getObjects } from "../../../Functions";
import CoachDto from "../../Coach/dto/coach.dto";
export class PlayerQueryService {
    async getPlayers(): Promise<Array<PlayerDto>> {
        return await Player.find({}).lean();
    }

    async getFavorites(coachID: string): Promise<Array<CoachDto>> {
        return await getObjects(Player, coachID, "coaches", "favorites");
    }
}
