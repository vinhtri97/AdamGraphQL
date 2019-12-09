import Player from "../schema/Player.schema";
// import PlayerDto from "../dto/player.dto";
import { patchDocument } from "../../../Functions";
import { UpdatePlayerInput } from "../dto/classes/UpdatePlayerInput";
export class PlayerMutationService {
    async updatePlayer(input: UpdatePlayerInput): Promise<boolean | Error> {
        return await patchDocument(Player, input);
    }
}
