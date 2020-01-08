import { Arg, Query, Resolver } from 'type-graphql';

import ChatDto from '../../../Non-Users/Chat/dto/Chat.dto';
import { GetSpectaclesDto } from '../dto/classes';
import SpectatorDto from '../dto/Spectator.dto';
import { SpectatorQueryService } from '../service';

// import PlayerDto from "./../../Player/dto/Player.dto";
@Resolver()
export class SpectatorQueryResolver {
    SpectatorQueryService: SpectatorQueryService;
    constructor() {
        this.SpectatorQueryService = new SpectatorQueryService();
    }

    @Query(() => [SpectatorDto])
    async getAllSpectators(): Promise<Array<SpectatorDto>> {
        return await this.SpectatorQueryService.getSpectators();
    }

    @Query(() => SpectatorDto)
    async getSpectatorByID(@Arg('spectatorID') spectatorID: string): Promise<SpectatorDto> {
        return await this.SpectatorQueryService.getSpectatorByID(spectatorID);
    }

    @Query(() => GetSpectaclesDto)
    async getKidsForSpectator(@Arg('spectatorID') spectatorID: string): Promise<GetSpectaclesDto> {
        return await this.SpectatorQueryService.getSpectacles(spectatorID);
    }

    @Query(() => [ChatDto])
    async getChatsForSpectator(@Arg('spectatorID') spectatorID: string): Promise<ChatDto[]> {
        return await this.SpectatorQueryService.getChats(spectatorID);
    }
}
