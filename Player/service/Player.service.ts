import Player from "../schema/player.schema";
import PlayerDto from "../dto/player.dto";

export default class PlayerService {
    async getPlayers(): Promise<Array<PlayerDto>> {
        return await Player.find({}).lean();
    }
}
