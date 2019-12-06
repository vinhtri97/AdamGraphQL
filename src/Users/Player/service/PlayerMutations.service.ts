import Player from "../schema/player.schema";
// import PlayerDto from "../dto/player.dto";
import { patchDocument } from "../../../Functions";
import { PatchPlayerInput } from "../inputs/index";
export class PlayerMutationService {
    async updatePlayer(input: PatchPlayerInput): Promise<boolean | Error> {
        return await patchDocument(Player, input);
    }
}
