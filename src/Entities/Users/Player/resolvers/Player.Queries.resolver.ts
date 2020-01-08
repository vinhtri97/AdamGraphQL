import { Arg, Query, Resolver } from 'type-graphql';

import CoachDto from '../../Coach/dto/Coach.dto';
import { GetSpectatorsDto, GetTeamsDto } from '../dto/classes';
import { GetVideosDto } from '../dto/classes/Player.GetVideos';
import PlayerDto from '../dto/Player.dto';
import Player from '../schema/Player.schema';
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

    @Query(() => PlayerDto)
    async getPlayerByID(@Arg('id') id: string): Promise<PlayerDto> {
        return await Player.findById(id).lean();
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
