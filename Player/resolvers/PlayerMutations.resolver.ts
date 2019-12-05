/* eslint-disable @typescript-eslint/camelcase */
import { Resolver, Mutation, Args, Arg } from "type-graphql";
import CreatePlayerInput from "../inputs/createPlayer.input";
import Player from "../schema/player.schema";
import Coach from "../../Coach/schema/coach.schema";
import { PlayerMutationService } from "./../service/PlayerMutations.service";
@Resolver()
export class PlayerMutationResolver {
    playerMutations: PlayerMutationService;
    constructor() {
        this.playerMutations = new PlayerMutationService();
    }

    @Mutation(() => String, { description: "This is somthing" })
    async createPlayer(@Args() input: CreatePlayerInput): Promise<string> {
        await Player.create(input);
        return input.id;
    }

    @Mutation(() => String)
    async patchThumbnail(
        @Arg("id") id: string,
        @Arg("thumbnail") thumbnail: string,
        @Arg("user_type") user_type: string
    ): Promise<string> {
        if (user_type == "Player")
            await Player.findByIdAndUpdate(id, { $set: { thumbnail } });
        if (user_type == "Coach")
            await Coach.findByIdAndUpdate(id, { $set: { thumbnail } });
        return thumbnail;
    }
}
