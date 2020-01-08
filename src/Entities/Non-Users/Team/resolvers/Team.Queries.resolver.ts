/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/camelcase */
import { Arg, Query, Resolver } from 'type-graphql';

import { getNestedTrueFalseObjects, getObjects } from '../../../../Functions';
import CoachDto from '../../../Users/Coach/dto/Coach.dto';
import TournamentDto from '../../Tournament/dto/Tournament.dto';
import { GetPlayersAndParentsDto, GetPlayersDto } from '../dto/classes';
import TeamDto from '../dto/Team.dto';
import Team from '../schema/Team.schema';
import { TeamQueryService } from '../service';

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
    async getTeamByID(@Arg('teamID') teamID: string): Promise<TeamDto | Error> {
        return await Team.findById(teamID).lean();
    }

    @Query(() => GetPlayersDto)
    async getPlayersForTeam(@Arg('teamID') teamID: string): Promise<GetPlayersDto | Error> {
        return await getNestedTrueFalseObjects(Team, teamID, 'players', 'players');
    }

    @Query(() => [CoachDto])
    async getCoachesForTeam(@Arg('teamID') teamID: string): Promise<Array<CoachDto> | Error> {
        return await getObjects(Team, teamID, 'coaches', 'coaches');
    }

    @Query(() => [TournamentDto])
    async getTournamentsForTeam(@Arg('teamID') teamID: string): Promise<Array<TournamentDto> | Error> {
        return await getObjects(Team, teamID, 'tournaments', 'tournaments');
    }

    @Query(() => GetPlayersAndParentsDto)
    async getPlayersAndParentsForTeam(@Arg('teamID') teamID: string): Promise<GetPlayersAndParentsDto | Error> {
        return await this.teamQueryService.getPlayersAndParents(teamID);
    }
}
