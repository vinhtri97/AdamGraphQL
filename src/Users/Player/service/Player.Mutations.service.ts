import Player from "../schema/Player.schema";
// import PlayerDto from "../dto/player.dto";
import { updateDocument } from "../../../Functions";
import { UpdatePlayerInput } from "../dto/classes/Player.UpdateInput";
export class PlayerMutationService {
    async updatePlayer(input: UpdatePlayerInput): Promise<boolean | Error> {
        return await updateDocument(Player, input);
    }
}
