/* eslint-disable @typescript-eslint/camelcase */
// import * as mongoose from "mongoose";
import { Arg, Query, Resolver } from "type-graphql";
import CoachDto from "../../Coach/dto/coach.dto";
import PlayerDto from "../dto/player.dto";
import Player from "../schema/player.schema";
import { PlayerQueryService } from "../service/PlayerQueries.service";
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
        return await this.playerQueryService.getFavorites(playerID);
    }
}
