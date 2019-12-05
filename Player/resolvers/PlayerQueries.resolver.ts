/* eslint-disable @typescript-eslint/camelcase */
import { Resolver, Arg, Query } from "type-graphql";
import Player from "../schema/player.schema";
import PlayerDto from "../dto/player.dto";
// import Coach from "../../Coach/schema/coach.schema";
import { PlayerQueryService } from "./../service/PlayerQueries.service";

@Resolver()
export class PlayerQueryResolver {
    playerQueries: PlayerQueryService;
    constructor() {
        this.playerQueries = new PlayerQueryService();
    }

    @Query(() => [PlayerDto])
    async getPlayers(): Promise<Array<PlayerDto>> {
        return await this.playerQueries.getPlayers();
    }

    @Query(() => PlayerDto)
    async getPlayerByID(@Arg("id") id: string): Promise<PlayerDto> {
        return await Player.findById(id).lean();
    }
}
