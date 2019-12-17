import Player from "../schema/Player.schema";
// import PlayerDto from "../dto/player.dto";
import Spectator from "../../Spectator/schema/Spectator.schema";
import Team from "../../../Non-Users/Team/schema/Team.schema";
import {
    updateDocument,
    changeInObjArray,
    removeFromObjArray
} from "../../../MongooseFunctions";
import { UpdatePlayerInput } from "../dto/classes/Player.UpdateInput";
export class PlayerMutationService {
    async updatePlayer(input: UpdatePlayerInput): Promise<boolean | Error> {
        return await updateDocument(Player, input);
    }

    async acceptSpectator(
        playerID: string,
        spectatorID: string,
        type: string
    ): Promise<boolean | Error> {
        return await changeInObjArray(
            Player,
            "spectators",
            playerID,
            { type, accepted: true },
            Spectator,
            "spectacles",
            spectatorID,
            { type, accepted: true }
        );
    }

    async removeSpectator(
        playerID: string,
        spectatorID: string
    ): Promise<boolean | Error> {
        return await removeFromObjArray(
            Player,
            "spectators",
            playerID,
            Spectator,
            "spectacles",
            spectatorID
        );
    }

    async changeType(
        spectatorID: string,
        playerID: string,
        type: string
    ): Promise<boolean | Error> {
        return await changeInObjArray(
            Player,
            "spectators",
            playerID,
            { type },
            Spectator,
            "spectacles",
            spectatorID,
            { type }
        );
    }

    async acceptTeam(
        playerID: string,
        teamID: string
    ): Promise<boolean | Error> {
        return await changeInObjArray(
            Player,
            "teams",
            playerID,
            { accepted: true },
            Team,
            "players",
            teamID,
            { accepted: true }
        );
    }
}
