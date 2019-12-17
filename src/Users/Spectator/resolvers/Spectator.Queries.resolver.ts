import { Resolver, Arg, Query } from "type-graphql";
import { SpectatorQueryService } from "../service/index";
import SpectatorDto from "../dto/Spectator.dto";
import PlayerDto from "./../../Player/dto/Player.dto";
import ChatDto from "../../../Non-Users/Chat/dto/Chat.dto";
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
    async getSpectatorByID(@Arg("id") id: string): Promise<SpectatorDto> {
        return await this.SpectatorQueryService.getSpectatorByID(id);
    }

    @Query(() => [PlayerDto])
    async getKidsForSpectator(@Arg("id") id: string): Promise<PlayerDto[]> {
        return await this.SpectatorQueryService.getSpectacles(id);
    }

    @Query(() => [ChatDto])
    async getChatsForSpectator(@Arg("id") id: string): Promise<ChatDto[]> {
        return await this.SpectatorQueryService.getChats(id);
    }
}
