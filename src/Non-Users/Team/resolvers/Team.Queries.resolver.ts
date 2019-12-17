/* eslint-disable @typescript-eslint/camelcase */
import { Arg, Query, Resolver } from "type-graphql";
import TeamDto from "../dto/Team.dto";
import CoachDto from "../../../Users/Coach/dto/Coach.dto";
import Team from "../schema/Team.schema";
import { GetPlayersDto } from "../dto/classes/index";
import { TeamQueryService } from "../service/index";
import { getObjects, getNestedTrueFalseObjects } from "./../../../Functions";

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
        const res = await getNestedTrueFalseObjects(
            Team,
            teamID,
            "players",
            "players"
        );
        res.pending = res.pending.filter(item => item != null);
        res.accepted = res.accepted.filter(item => item != null);
        return res;
    }

    @Query(() => [CoachDto])
    async getCoachesForTeam(
        @Arg("teamID") teamID: string
    ): Promise<Array<CoachDto> | Error> {
        return await getObjects(Team, teamID, "coaches", "coaches");
    }
}
