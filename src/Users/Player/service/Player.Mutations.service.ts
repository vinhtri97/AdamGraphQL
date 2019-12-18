/* eslint-disable @typescript-eslint/no-explicit-any */
import Player from "../schema/Player.schema";
import Team from "../../../Non-Users/Team/schema/Team.schema";
import Chat from "../../../Non-Users/Chat/schema/Chat.schema";
import Spectator from "../../Spectator/schema/Spectator.schema";
import { updateDocument, changeInObjArray } from "../../../MongooseFunctions";
import {
    getNestedTrueFalseObjects,
    handleTeamChatsForParents
} from "../../../Functions";
import { handleSpectatorRemoved } from "../../../Functions";
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
        if (type != "Spectator") {
            const teams = await getNestedTrueFalseObjects(
                Player,
                playerID,
                "teams",
                "teams"
            );
            teams.pending = teams.pending.filter(item => item != null);
            teams.accepted = teams.accepted.filter(item => item != null);

            const foundTeams: any = await Team.find({
                _id: {
                    $in: teams.accepted.map(
                        ({ _id: teamID }: { _id: string }) => teamID
                    )
                }
            });
            const foundTeamsFullChatIDs: any = foundTeams.map(
                (teamObj: any) => teamObj.fullPlayerAndParentChat
            );
            await Chat.updateMany(
                { _id: { $in: foundTeamsFullChatIDs } },
                {
                    $addToSet: {
                        users: {
                            id: spectatorID,
                            type: "Spectator",
                            muted: false
                        }
                    }
                }
            );
        }

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
        return await handleSpectatorRemoved(playerID, spectatorID);
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
        return await handleTeamChatsForParents(teamID, playerID);
    }

    async leaveTeam(
        playerID: string,
        teamID: string
    ): Promise<boolean | Error> {
        return await handleTeamChatsForParents(teamID, playerID, false);
    }
}
