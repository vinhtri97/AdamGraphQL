import { Resolver, Mutation, Args, Arg, Query } from "type-graphql";
import CreatePlayerInput from "../inputs/createPlayer.input";
import Player from "../schema/player.schema";
import PlayerDto from "../dto/player.dto";

import PlayerService from "../service/Player.service";
@Resolver()
export default class PlayerResolver {
    playerService: PlayerService;
    constructor() {
        this.playerService = new PlayerService();
    }

    @Mutation(() => String, { description: "This is somthing" })
    async createPlayer(@Args() input: CreatePlayerInput): Promise<string> {
        await Player.create(input);
        return input.id;
    }

    @Mutation(() => String)
    async patchThumbnail(
        @Arg("id") id: string,
        @Arg("thumbnail") thumbnail: string
    ): Promise<string> {
        await Player.findByIdAndUpdate(id, { $set: { thumbnail } });
        return thumbnail;
    }

    @Query(() => [PlayerDto])
    async getPlayers(): Promise<Array<PlayerDto>> {
        return await this.playerService.getPlayers();
    }

    @Query(() => PlayerDto)
    async getPlayerByID(@Arg("id") id: string): Promise<PlayerDto> {
        return await Player.findById(id).lean();
    }
}
