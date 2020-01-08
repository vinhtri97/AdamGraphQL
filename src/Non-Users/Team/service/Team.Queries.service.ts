/* eslint-disable @typescript-eslint/no-explicit-any */
import Team from "../schema/Team.schema";
import TeamDto from "../dto/Team.dto";
import { GetPlayersAndParentsDto } from "../dto/classes/index";
import { getNestedTrueFalseObjects } from "./../../../Functions";
import Spectator from "../../../Users/Spectator/schema/Spectator.schema";
export class TeamQueryService {
    async getTeams(): Promise<Array<TeamDto>> {
        return await Team.find({}).lean();
    }

    async getPlayersAndParents(
        teamID: string
    ): Promise<GetPlayersAndParentsDto | Error> {
        const players = await getNestedTrueFalseObjects(
            Team,
            teamID,
            "players",
            "players"
        );
        const filteredPlayers = players.accepted.filter(
            ({ spectators }) =>
                spectators.length > 0 &&
                spectators.some(
                    (obj: { type: string }) => obj.type != "Spectator"
                )
        );
        const parentIDs: any[] = [];
        filteredPlayers.forEach(player => {
            player.spectators.forEach(
                (spectator: { type: string; id: { toString: () => any } }) => {
                    if (spectator.type != "Spectator")
                        parentIDs.push(spectator.id.toString());
                }
            );
        });
        const spectators = await Spectator.find({
            _id: { $in: parentIDs }
        }).lean();
        return { players: { ...players }, parents: spectators };
    }
}
