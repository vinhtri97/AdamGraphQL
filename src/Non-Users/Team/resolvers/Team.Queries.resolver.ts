/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/camelcase */
import { Arg, Query, Resolver } from "type-graphql";
import TeamDto from "../dto/Team.dto";
import CoachDto from "../../../Users/Coach/dto/Coach.dto";
import Team from "../schema/Team.schema";
import { GetPlayersDto, GetPlayersAndParentsDto } from "../dto/classes/index";
import { TeamQueryService } from "../service/index";
import TournamentDto from "../../Tournament/dto/Tournament.dto";
import { getObjects, getNestedTrueFalseObjects } from "./../../../Functions";
import Spectator from "../../../Users/Spectator/schema/Spectator.schema";
// const ObjectId = mongoose.Types.ObjectId;
@Resolver()
export class TeamQueryResolver {
    teamQueryService: TeamQueryService;
    constructor() {
        this.teamQueryService = new TeamQueryService();
    }

    @Query(() => [TeamDto])
    async getTeams(): Promise<Array<TeamDto>> {
        return await this.teamQueryService.getTeams();
    }

    @Query(() => TeamDto)
    async getTeamByID(@Arg("teamID") teamID: string): Promise<TeamDto | Error> {
        return await Team.findById(teamID).lean();
    }

    @Query(() => GetPlayersDto)
    async getPlayersForTeam(
        @Arg("teamID") teamID: string
    ): Promise<GetPlayersDto | Error> {
        return await getNestedTrueFalseObjects(
            Team,
            teamID,
            "players",
            "players"
        );
    }

    @Query(() => [CoachDto])
    async getCoachesForTeam(
        @Arg("teamID") teamID: string
    ): Promise<Array<CoachDto> | Error> {
        return await getObjects(Team, teamID, "coaches", "coaches");
    }

    @Query(() => [TournamentDto])
    async getTournamentsForTeam(
        @Arg("teamID") teamID: string
    ): Promise<Array<TournamentDto> | Error> {
        return await getObjects(Team, teamID, "tournaments", "tournaments");
    }

    @Query(() => GetPlayersAndParentsDto)
    async getPlayersAndParentsForTeam(
        @Arg("teamID") teamID: string
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
        console.log(spectators);
        return { players: players.accepted, parents: spectators };
    }
}
