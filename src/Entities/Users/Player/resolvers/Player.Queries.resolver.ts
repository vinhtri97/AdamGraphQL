import { Arg, Info, Query, Resolver } from 'type-graphql';

import CoachDto from '../../Coach/dto/Coach.dto';
import { GetSpectatorsDto, GetTeamsDto } from '../dto/classes';
import { GetVideosDto } from '../dto/classes/Player.GetVideos';
import ExpandablePlayerDto from '../dto/ExpandablePlayer.dto';
import PlayerDto from '../dto/Player.dto';
import { PlayerQueryService } from '../service';

/* eslint-disable @typescript-eslint/camelcase */
@Resolver()
export class PlayerQueryResolver {
    playerQueryService: PlayerQueryService;
    constructor() {
        this.playerQueryService = new PlayerQueryService();
    }

    @Query(() => [PlayerDto])
    async getPlayers(): Promise<Array<PlayerDto>> {
        return await this.playerQueryService.getPlayers();
    }

    @Query(() => ExpandablePlayerDto)
    async getPlayerByID(@Arg('playerID') id: string, @Info() info): Promise<ExpandablePlayerDto> {
        return await this.playerQueryService.getPlayer(id, info);
    }

    @Query(() => [CoachDto])
    async getFavoritesForPlayer(@Arg('playerID') playerID: string): Promise<Array<CoachDto>> {
        return await this.playerQueryService.getFavorites(playerID);
    }

    @Query(() => GetTeamsDto)
    async getTeamsForPlayer(@Arg('playerID') playerID: string): Promise<GetTeamsDto> {
        return await this.playerQueryService.getTeams(playerID);
    }

    @Query(() => GetSpectatorsDto)
    async getSpectatorsForPlayer(@Arg('playerID') playerID: string): Promise<GetSpectatorsDto> {
        return await this.playerQueryService.getSpectators(playerID);
    }

    @Query(() => GetTeamsDto)
    async getVideosForPlayer(@Arg('playerID') playerID: string): Promise<GetVideosDto> {
        return await this.playerQueryService.getVideos(playerID);
    }
}
