/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/camelcase */
import { Resolver, Mutation, Args } from "type-graphql";
import { CreatePlayerInput, PatchPlayerInput } from "../inputs/index";
import Player from "../schema/player.schema";
import { PlayerMutationService } from "../service/PlayerMutations.service";

@Resolver()
export class PlayerMutationResolver {
    playerMutationService: PlayerMutationService;
    constructor() {
        this.playerMutationService = new PlayerMutationService();
    }

    @Mutation(() => String, { description: "This is somthing" })
    async createPlayer(@Args() input: CreatePlayerInput): Promise<string> {
        const player = await Player.create(input);
        return player.id;
    }

    @Mutation(() => Boolean, { nullable: true })
    async patchPlayer(
        @Args() input: PatchPlayerInput
    ): Promise<boolean | Error> {
        return await this.playerMutationService.patchPlayer(input);
    }
}
