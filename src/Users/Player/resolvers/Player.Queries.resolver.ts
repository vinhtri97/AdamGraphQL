/* eslint-disable @typescript-eslint/camelcase */
// import * as mongoose from "mongoose";
import { Arg, Query, Resolver } from "type-graphql";
import CoachDto from "../../Coach/dto/Coach.dto";
import PlayerDto from "../dto/Player.dto";
import Player from "../schema/Player.schema";
import { PlayerQueryService } from "../service/index";
import { GetTeamsDto, GetSpectatorsDto } from "../dto/classes/index";
// import { getObjects } from "./../../../Functions";

// const ObjectId = mongoose.Types.ObjectId;
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
    async getPlayerByID(@Arg("id") id: string): Promise<PlayerDto> {
        return await Player.findById(id).lean();
    }

    @Query(() => [CoachDto])
    async getFavoritesForPlayer(
        @Arg("playerID") playerID: string
    ): Promise<Array<CoachDto>> {
        return await this.playerQueryService.getFavoritesForPlayer(playerID);
    }

    @Query(() => GetTeamsDto)
    async getTeamsForPlayer(
        @Arg("playerID") playerID: string
    ): Promise<GetTeamsDto> {
        return await this.playerQueryService.getTeamsForPlayer(playerID);
    }

    @Query(() => GetSpectatorsDto)
    async getSpectatorsForPlayer(
        @Arg("playerID") playerID: string
    ): Promise<GetSpectatorsDto> {
        return await this.playerQueryService.getSpectatorsForPlayer(playerID);
    }
}
