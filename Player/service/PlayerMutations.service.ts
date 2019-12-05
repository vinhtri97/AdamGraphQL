import Player from "../schema/player.schema";
import PlayerDto from "../dto/player.dto";

export class PlayerMutationService {
    async getPlayers(): Promise<Array<PlayerDto>> {
        return await Player.find({}).lean();
    }
}
