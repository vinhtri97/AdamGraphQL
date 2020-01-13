import { Arg, Query, Resolver } from 'type-graphql';

import TeamDto from '../../../Non-Users/Team/dto/Team.dto';
import PlayerDto from '../../Player/dto/Player.dto';
import CoachDto from '../dto/Coach.dto';
import { CoachQueryService } from '../service';

@Resolver()
export class CoachQueryResolver {
    coachQueryService: CoachQueryService;
    constructor() {
        this.coachQueryService = new CoachQueryService();
    }

    @Query(() => [CoachDto])
    async getCoaches(): Promise<Array<CoachDto>> {
        return await this.coachQueryService.getCoaches();
    }

    @Query(() => CoachDto)
    async getCoachByID(@Arg('coachID') id: string): Promise<CoachDto> {
        return await this.coachQueryService.getCoachByID(id);
    }

    @Query(() => [PlayerDto])
    async getFavoritesForCoach(@Arg('coachID') coachID: string): Promise<Array<PlayerDto>> {
        return await this.coachQueryService.getFavorites(coachID);
    }

    @Query(() => [TeamDto])
    async getTeamsForCoach(@Arg('coachID') coachID: string): Promise<Array<TeamDto>> {
        return await this.coachQueryService.getTeams(coachID);
    }
}
